/**
 * Constants for AWS Cognito Auth
 * @type {{PLACEHOLDER_PASSWORD: string, error: {USER_NOT_FOUND: string, USERNAME_EXISTS: string}}}
 */
const awsCognitoAuth = {
  PLACEHOLDER_PASSWORD: 'Password123*',
  error: {
    USER_NOT_FOUND: 'UserNotFoundException',
    USER_NOT_CONFIRMED: 'UserNotConfirmedException',
    USERNAME_EXISTS: 'UsernameExistsException',
    UserLambdaValidationException: 'UserLambdaValidationException',
    PreferredUsernameExistsException: 'PreferredUsernameExistsException',
    NotAuthorizedException: 'NotAuthorizedException',
    NO_USER: ' No current subscriber',
    INVALID_OTP: 'UserLambdaValidationException',
    INVALID_SESSION: 'NotAuthorizedException',
    message: {
      NO_USER: 'Code is invalid, try again',
      INVALID_OTP: 'Code has now expired, request new one',
      INVALID_SESSION: 'Code has already expired, request new one',
    },
  },
};

/**
 * Constants for AWS Amplify Storage (S3)
 * @type {{ACCESS_LEVEL_PROTECTED: string}}
 */
const awsStorage = {
  accessLevel: {
    PROTECTED: 'protected',
    PUBLIC: 'public',
  },
  cache: {
    ONE_CALENDER_YEAR: '31536000',
  },
  cdn: {
    DEV: 'd26u7w064jxl38.cloudfront.net/',
    PROD: 'd2ez6lox3k9lt0.cloudfront.net/',
  },
  folders: {
    VIDEOS: 'Videos',
    THUMBNAILS: 'Thumbnails',
  },
  defaultThumbnail: 'public/fitpin-public/fitpin_workout_thumbnail_01.jpg',
  upload: {
    status: {
      UPLOADING: 'UPLOADING',
      FAILED: 'FAILED',
      SUCCESS: 'SUCCESS',
      NONE: 'NONE',
    },
    message: {
      UPLOADING: 'Uploading Fit',
      FAILED: 'Upload failed',
      PENDING: 'Upload has been paused',
    },
  },
};

/**
 * Constant for duration
 * @type {{ONE_MINUTE: number}}
 */
const duration = {
  THIRTY_SECONDS: 30000,
  ONE_MINUTE: 60000,
};

/**
 * FitPin topics ARN
 * @type {{workouts: {CREATED: string}}}
 */
export const notificationARNS = {
  app: {
    PROD: 'arn:aws:sns:eu-west-1:581896794579:app/APNS/FitPin-PushNotifications-Platform',
    DEV: 'arn:aws:sns:eu-west-1:581896794579:app/APNS_SANDBOX/FitPin-PushNotifications-Platform',
  },
  topics: {
    workouts: 'arn:aws:sns:eu-west-1:581896794579:New-Workout-Topic',
    subscriptions: 'arn:aws:sns:eu-west-1:581896794579:New-User-Topic',
  },
};

/**
 * Topic filters for AWS SNS push notifications
 * @type {{action: {NEW_SUBSCRIBER: string, NEW_WORKOUT: string}}}
 */
const topicFilters = {
  action: {
    NEW_SUBSCRIBER: 'NEW_SUBSCRIBER',
    NEW_WORKOUT: 'NEW_WORKOUT',
  },
};

/**
 * Get the userpool ids for Amplify
 * @type {{PROD: string, DEV: string}}
 */
const amplifyUserPoolIds = {
  DEV: 'eu-west-2_b431TabOY',
  PROD: 'eu-west-2_1xTfnZx6h',
};

export default {
  awsCognitoAuth,
  awsStorage,
  duration,
  topicFilters,
  amplifyUserPoolIds,
};
