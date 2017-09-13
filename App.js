import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { cognitoSignupUser, cognitoGetCurrentUser } from './cognito';

export default class XustosApp extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Yeah! First App!</Text>
        <Text>Changes you make will automatically reload or not.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('XustosApp', () => XustosApp);
