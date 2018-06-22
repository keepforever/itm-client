import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  StyleSheet,
  Text,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
  View } from 'react-native';

class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let userToken = null;
    try {
      userToken = await AsyncStorage.getItem('userToken');
    } catch(error) {
      console.log(error)
    }
    let response;
    try {
      response = await this.props.mutate({
        variables: {
          token: userToken,
        },
      });
    } catch (err) {
      console.log("34 CATCH")
      this.props.navigation.navigate('Auth');
      return;
    }
    const { refreshToken } = response.data;
    await AsyncStorage.setItem('userToken', refreshToken);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const refreshTokenMutation = gql`
  mutation($token: String!) {
    refreshToken(token: $token)
  }
`;

export default graphql(refreshTokenMutation)(AuthLoadingScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
