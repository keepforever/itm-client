import React, {Component} from 'react';
import {
  ImageBackground, StyleSheet,
  AsyncStorage, Text,
  View, KeyboardAvoidingView,
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {Button} from 'react-native-elements'

import TextField from '../../components/TextField';
import wallpaper from  '../../../assets/images/Wallpaper_StormSeeker.jpg';

import { clearLog } from '../../utils';

const defaultState = {
  values: {
    name: '',
    email: '',
    password: '',
  },
  errors: {},
  isSubmitting: false,
};

class Signup extends Component {
  static navigationOptions = ({navigation}) => {
    const {routeName} = navigation.state
    return {
      title: `${routeName}`,
      headerStyle: {
        backgroundColor: 'black',
        height: 50,
        width: '100%'
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 16
      }
    };
  };

  state = defaultState;

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  };

  getData = async () => {
    console.log('Get Data called!')
    try {
      let theData = await AsyncStorage.getItem('userToken')
      alert(theData)
    } catch(error) {
      console.log(error)
    }
  }
  submit = async () => {
    if (this.state.isSubmitting) {
      return;
    }

    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    isEmailValid = pattern.test(this.state.values.email)
    clearLog('isEmailValid', isEmailValid)

    if(!isEmailValid) {
      alert("Please Enter a Valid Email")
      this.setState({
        isSubmitting: false,
        values: {
          ...defaultState.values
        }
      });
      return
    }

    this.setState({ isSubmitting: true });
    let response;
    try {
      response = await this.props.mutate({
        variables: this.state.values,
      });
    } catch (err) {
      clearLog('ERR', err)
      this.setState({
        errors: {
          email: 'Already taken',
        },
        isSubmitting: false,
      });
      return;
    }
    clearLog('response', response)

    await AsyncStorage.clear()
    clearLog('CLEAR ASYNC CALLED', await AsyncStorage.getAllKeys())

    const numFriends = response.data.signup.user.friends.length.toString()
    const numInbox = response.data.signup.user.inbox.length.toString()

    await AsyncStorage.multiSet([
      ['userToken', response.data.signup.token],
      ['userName', response.data.signup.user.name],
      ['userAbout', response.data.signup.user.about],
      ['userInboxCount', numInbox],
      ['userFriendCount', numFriends],
    ]);

    const asyncGetUserInfo = async () => {
      return {
        userName: await AsyncStorage.getItem('userName'),
        userAbout: await AsyncStorage.getItem('userAbout'),
        userInboxCount: await AsyncStorage.getItem('userInboxCount'),
        userFriendCount: await AsyncStorage.getItem('userFriendCount')
      }
    }

    clearLog('asyncGetUserInfo', await asyncGetUserInfo())

    clearLog('token: ', response.data.signup.token)
    this.props.navigation.navigate('Main');

  };

  goToLoginPage = () => {
    this.props.navigation.navigate('Login');
  };

  clearStorage = async () => {
    console.log( await AsyncStorage.getAllKeys())
    await AsyncStorage.clear()
    console.log( await AsyncStorage.getAllKeys())
  }

  listStorage = async () => {
    console.log( await AsyncStorage.getAllKeys())
  }

  render() {
    const { errors, values: { name, email, password } } = this.state;

    clearLog('state', this.state)
    if(!wallpaper){
      return null
    }

    return (
      <ImageBackground
        source={wallpaper}
        style={{width: '100%', height: '100%'}}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
            <View style={{ width: 200 }}>
            <Text style={{color: 'white'}}> for testing, create accounts like:  </Text>
            <Text style={{color: 'white'}}>email: amy@amy.com</Text>
            <Text style={{color: 'white'}}>password: amy </Text>
            <Text style={{color: 'white'}} >(replace "amy" with anything you like)</Text>
            <TextField value={name} name="name" onChangeText={this.onChangeText} />
            {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
            <TextField value={email} name="email" onChangeText={this.onChangeText} />
            <TextField
              value={password}
              name="password"
              onChangeText={this.onChangeText}
              secureTextEntry
            />
            <Button
              color="red"
              buttonStyle={{
                  backgroundColor: "black",
                  height: 50,
                  borderColor: "red",
                  borderWidth: 1,
                  borderRadius: 10
                }}
              raised={true}
              title="Create account"
              onPress={this.submit}
            />
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 30 }}>
              or
            </Text>
            <Button
              color="red"
              buttonStyle={{
                  backgroundColor: "black",
                  height: 50,
                  borderColor: "red",
                  borderWidth: 1,
                  borderRadius: 10
                }}
              raised={true}
              title="Login Instead"
              onPress={this.goToLoginPage}
            />
            {/* <Button title="Get Data" onPress={this.getData} />
            <Button title="CLEAR STORAGE" onPress={this.clearStorage} />
            <Button title="LIST STORAGE" onPress={this.listStorage} /> */}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const signUpMutation = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signup(
      name: $name,
      email: $email,
      password: $password,
      about:"Just trying to live the best life I can.",
      interests: {set: ["cloths", "food", "concerts"]}) {
      token
      user {
        id
        name
        about
        friends{
          id
        }
        inbox{
          id
        }
      }
    }
  }
`;

export default graphql(signUpMutation)(Signup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "black",
    width: '100%',
    height: 50,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 10
  },
})
