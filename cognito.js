import AWS from 'aws-sdk/dist/aws-sdk-react-native';

const poolData = { UserPoolId : 'us-east-1_2R3gQaodp',
    ClientId : '2skfn5ug4t2fjpg1b7lr9r9dn0'
};

export const cognitoRegisterUser = (email, msisdn) => {
  AWSCognito.config.region = 'us-east-1'; //This is required to derive the endpoint

   const userPool =
    new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

   const attributeList = [];

   const dataEmail = {
       Name : 'email',
       Value : email
   };

   const dataPhoneNumber = {
     Value : msisdn,
     Name : 'phone_number',
     Value : msisdn
   };
   const attributeEmail =
    new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
   const attributePhoneNumber =
    new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);

   attributeList.push(attributeEmail);
   attributeList.push(attributePhoneNumber);

   userPool.signUp('username', 'password', attributeList, null,
    (err, result) => {
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
