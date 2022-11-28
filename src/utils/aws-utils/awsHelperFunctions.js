/* eslint-disable */
import * as mutations from "../../graphql/mutations";
import {API, Auth, graphqlOperation, Storage} from "aws-amplify";
import * as AWS from "aws-sdk";
import awsmobile from "../../aws-exports";
import * as queries from "../../graphql/queries";
import {generateCDNUrl, generateFileName} from "../general/utils";

/**
 * Persist User Cognito details to the DB
 * @param userAttributes
 */
const persistUserToDB = async userAttributes => {
  const payload = {
    cognitoId: userAttributes.sub,
    username: userAttributes.email,
    preferred_username: userAttributes.preferred_username,
  };

  return API.graphql(
    graphqlOperation(mutations.createCreator, {
      input: {
        ...payload,
      },
    }),
  );
};

/**
 * Get User details from the DB
 * @param email
 */
const getUserFromDB = async email => {
  const response = await API.graphql(graphqlOperation(queries.listCreators, {
        filter: {
          username: {
            eq: email,
          },
        },
      },
    ),
  );
  const creators = response.data.listCreators.items;
  return creators.length > 0 ? creators[0] : null;
}

/**
 * Delete a user from the user pool
 * This is needed because user is always verified and stored in the pool regardless of successful
 * @returns {Promise<void>}
 */
const deleteCognitoUser = async (username) => {
  AWS.config.credentials = await Auth.currentCredentials();
  const cognito = new AWS.CognitoIdentityServiceProvider({ region: awsmobile.aws_cognito_region });
  const params = {
    Username: username,
    UserPoolId: awsmobile.aws_user_pools_id,
  };
  return cognito.adminDeleteUser(params).promise();
};

/**
 * Disable a user from the user pool
 * This is needed because user is always verified and stored in the pool regardless of successful
 * @returns {Promise<void>}
 */
const disableCognitoUser = async (username) => {
  AWS.config.credentials = await Auth.currentCredentials();
  const cognito = new AWS.CognitoIdentityServiceProvider({ region: awsmobile.aws_cognito_region });
  const params = {
    Username: username,
    UserPoolId: awsmobile.aws_user_pools_id,
  };
  await cognito.adminDisableUser(params).promise();
};

/**
 * Retrieve a Cognito user from the pool
 * @returns {Promise<void>}
 */
const retrieveCognitoUser = async (username) => {
  AWS.config.credentials = await Auth.currentCredentials();
  const cognito = new AWS.CognitoIdentityServiceProvider({ region: awsmobile.aws_cognito_region });
  const params = {
    Username: username,
    UserPoolId: awsmobile.aws_user_pools_id,
  };
  return await cognito.adminGetUser(params).promise();
};

/**
 * Check if sign up is complete
 * @returns {Promise<void>}
 */
const isCompleteSignUp = async (user) => {
  const userAttributes = user.UserAttributes;
  const requiredAttributes = userAttributes.filter(attribute => attribute.Name === "preferred_username" || attribute.Name === "custom:userId");
  return requiredAttributes.length === 2;
};

/**
 * Check if preferred username has been taken
 */
const doesPreferredUsernameExists = async (preferred_username) => {
  AWS.config.credentials = await Auth.currentCredentials();
  const cognito = new AWS.CognitoIdentityServiceProvider({ region: awsmobile.aws_cognito_region });
  const params = {
    UserPoolId: awsmobile.aws_user_pools_id,
    AttributesToGet: ["preferred_username"],
    Filter: `preferred_username = \"${preferred_username}\"`,
    Limit: 1,
  };

  const { Users } = await cognito.listUsers(params).promise();

  return Users && Users.length > 0;
};

/**
 * Upload file to AWS S3 bucket
 * Note: This is similar to a http PUT operation as we are replacing the existing file
 * @returns {Promise<string>}
 * @param toBeUploadedUri
 * @param key
 * @param toBeDeletedUri
 * @param type
 */
const uploadAndDeleteS3 = async (toBeUploadedUri, key, toBeDeletedUri, type) => {

  /**
   * Upload a new file
   */
  if(toBeUploadedUri) {
    const blobResponse = await fetch(toBeUploadedUri);
    const blob = await blobResponse.blob();

    const toBeUploadedFileName = generateFileName(type);
    const toBeUploadedKey = key + "/" + toBeUploadedFileName
    const s3Response = await Storage.put(toBeUploadedKey, blob);
    return generateCDNUrl(s3Response.key);
  }

  /**
   * Delete the previous file
   */
  if(toBeDeletedUri) {
    const toBeDeletedFileName = toBeDeletedUri.split("/")[3];
    const toBeDeletedKey = key + "/" + toBeDeletedFileName;
    await Storage.remove(toBeDeletedKey);
  }

  return ""

}

/**
 * Check if user is auth
 * @returns {Promise<boolean>}
 */
const isUserAuthenticated = async () => {
  let isAuthenticated = false;
  try {
    await Auth.currentAuthenticatedUser()
    isAuthenticated = true
  } catch (err) {
    /**
     * Do nothing
     */
  }
  return isAuthenticated;
}


export {
  persistUserToDB,
  getUserFromDB,
  deleteCognitoUser,
  disableCognitoUser,
  retrieveCognitoUser,
  isCompleteSignUp,
  doesPreferredUsernameExists,
  uploadAndDeleteS3,
  isUserAuthenticated
};
