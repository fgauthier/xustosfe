//- AWS.js
//create AWS with userPool using dotenv to hold environment variables
import AWS, {
  CognitoIdentityServiceProvider
}
from 'aws-sdk/dist/aws-sdk-react-native';
import * as enhancements from 'react-native-aws-cognito-js';
import {
  AWS_REGION, AWS_POOL_ID, AWS_POOL_CLIENT_ID
}
from 'react-native-dotenv';

Object.keys(enhancements).forEach(key => (CognitoIdentityServiceProvider[key] =
  enhancements[key]));

AWS.config.update({
  region: AWS_REGION
});

export const poolData = {
  UserPoolId: AWS_POOL_ID,
  ClientId: AWS_POOL_CLIENT_ID,
};

export const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(
  poolData);

export default AWS;
