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
import { addUser } from '../store/actions/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
      response = await this.props.mutate();
    } catch (err) {
      console.log("AuthLoadingScreen Catch Block Reached with Error: ", "\n", err)
      this.props.navigation.navigate('Auth');
      return;
    }
    const { refreshToken: {token: newToken, userId} } = response.data;
    await AsyncStorage.setItem('userToken', newToken);
    console.log("AuthLoadingScreen, userId: ", userId)
    this.props.addUserAction(userId)
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
  mutation {
    refreshToken {
      token
      userId
    }
  }
`;

const mapDispatchToProps = dispatch => {
  return bindActionCreators({addUserAction: addUser}, dispatch)
}

export default connect(null, mapDispatchToProps)(graphql(refreshTokenMutation)(AuthLoadingScreen))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//
// const refreshTokenMutation = gql`
//   mutation($token: String!) {
//     refreshToken(token: $token)
//   }
// `;
