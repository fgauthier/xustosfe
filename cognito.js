import AWS from 'aws-sdk/dist/aws-sdk-react-native';

const poolData = {
  UserPoolId: 'us-east-1_2R3gQaodp',
  ClientId: '2skfn5ug4t2fjpg1b7lr9r9dn0'
};

export const cognitoSignupUser = (email, msisdn, username, password) => {
  AWSCognito.config.region = 'us-east-1'; //This is required to derive the endpoint

  const userPool =
    new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

  const attributeList = [];

  const dataEmail = {
    Name: 'email',
    Value: email
  };
  const attributeEmail =
    new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(
      dataEmail);
  attributeList.push(attributeEmail);

  const dataPhoneNumber = {
    Name: 'phone_number',
    Value: msisdn,
  };
  const attributePhoneNumber =
    new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(
      dataPhoneNumber);
  attributeList.push(attributePhoneNumber);

  userPool.signUp(username, password, attributeList, null, (err, result) => {
    if (err) {
      alert(err);
      return;
    }
    cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
  });
};

export const cognitoGetCurrentUser = () => {
  const userPool =
    new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser();

  if (cognitoUser != null) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        alert(err);
        return;
      }
      console.log('session validity: ' + session.isValid());
    });
  }
};

export const cognitoAuthenticate = (username, password) => {

  const authenticationData = {
    Username: username,
    Password: password
  };

  const authenticationDetails =
    new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(
      authenticationData);

  const userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(
    poolData);

  const userData = {
    Username: username,
    Pool: userPool
  };
  const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(
    userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      console.log('access token + ' + result.getAccessToken().getJwtToken());
      // Use the idToken for Logins Map when Federating User Pools with
      // Cognito Identity or when passing through an Authorization Header to
      // an API Gateway Authorizer
      console.log('idToken + ' + result.idToken.jwtToken);
    },

    onFailure: (err) => {
      alert(err);
    },

    mfaRequired: (codeDeliveryDetails) => {
      const verificationCode = prompt('Please input verification code',
        '');
      cognitoUser.sendMFACode(verificationCode, this);
    },
  });
}
