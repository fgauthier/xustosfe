//import AWS and userPool
import AWS, {
  userPool
}
from './AWS';

//component:
state = {
  username: '',
  password: '',
}

login = () => {
  const {
    username, password
  } = this.state;
  const authenticationData = {
    Username: username,
    Password: password
  };
  const authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(
    authenticationData);
  const userData = {
    Username: username,
    Pool: userPool
  };
  const cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(
    userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      console.log('result', result);
      console.log('access token:', result.getAccessToken().getJwtToken());
    },
    onFailure: (error) => {
      Alert.alert(error.code, error.message);
    },
  });
}
