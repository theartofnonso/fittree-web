/**
 * Validate email if it is of acceptable format
 * @param email
 * @returns {boolean}
 */
import awsmobile from "../../aws-exports";
import awsConstants from "../aws-utils/awsConstants";
import * as uuid from "uuid";

export const isEmailValid = email => {
    const regex =
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(email);
};

/**
 * Validate the value if it only contains words, periods and underscore
 * @param value
 * @returns {boolean}
 */
export const onlyPeriodsUnderscore = value => {
    const regex = /^[a-zA-Z._]+$/;
    return regex.test(value);
};

/**
 * Returns a unique string for a file
 */
export const generateRandomString = () => {
    const uuidString = uuid.v4().split('-').join('');
    const randomChars = `${uuidString}AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz${new Date().getTime()}`;
    let generatedRandomChars = '';
    for (let i = 0; i < 50; i++) {
        generatedRandomChars += randomChars.charAt(
            Math.floor(Math.random() * randomChars.length),
        );
    }
    return generatedRandomChars;
};

/**
 * Returns a unique filename for a file
 */
export const generateFileName = fileType => {
    let generatedRandomString = generateRandomString()
    return `${generatedRandomString}.${fileType}`;
};

/**
 * Handler function to handle successful upload
 * @param key
 */
export const generateCDNUrl = key => {
    const cdn =
        awsmobile.aws_user_pools_id === awsConstants.amplifyUserPoolIds.PROD
            ? awsConstants.awsStorage.cdn.PROD
            : awsConstants.awsStorage.cdn.DEV;
    return `${cdn}${awsConstants.awsStorage.accessLevel.PUBLIC}/${key}`;
};

export /**
 * Force capitlisation of words in a string
 * @param string
 */
const capitaliseWords = string => {
    const words = string.split(' ');

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(' ');
};
