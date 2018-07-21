import React from 'react';
import {
  KeyboardAvoidingView, StyleSheet,
  AsyncStorage, Text, View,
  ImageBackground,
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import wallpaper from  '../../../assets/images/Wallpaper_StormSeeker.jpg';
import {Button} from 'react-native-elements'
import { clearLog } from '../../utils';

import TextField from '../../components/TextField';

const defaultState = {
  values: {
    email: '',
    password: '',
  },
  errors: {},
  isSubmitting: false,
};

class Login extends React.Component {
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

  submit = async () => {
    if (this.state.isSubmitting) {
      return;
    }
    this.setState({ isSubmitting: true });

    const { email, password } = this.state.values
    if(email.length < 1 || password.length < 1) {
      alert("Please enter creds and try again")
      this.setState({ isSubmitting: false })
      return
    }

    const response = await this.props.mutate({
      variables: this.state.values,
    });

    const { payload, error } = response.data.login;
    if (payload) {
      console.log('Login Token', payload.token)
      const numFriends = payload.user.friends.length.toString()
      const numInbox = payload.user.inbox.length.toString()
      await AsyncStorage.multiSet([
        ['userToken', payload.token],
        ['userName', payload.user.name],
        ['userAbout', payload.user.about],
        ['userInboxCount', numInbox],
        ['userFriendCount', numFriends],
      ]);
      // await AsyncStorage.setItem('userName', payload.user.name);
      // await AsyncStorage.setItem('userAbout', payload.user.about);
      this.props.navigation.navigate('Main');
      alert('Welcome Back ' + payload.user.name)
    } else {
      this.setState({
        errors: {
          [error.field]: error.msg,
        },
        isSubmitting: false,
      });
    }
  };

  goToSignup = () => {
    this.props.navigation.navigate('SignUp')
  };

  render() {
    const { errors, values: { email, password } } = this.state;

    return (
      <ImageBackground
        source={wallpaper}
        style={{width: '100%', height: '100%'}}
      >
        <KeyboardAvoidingView
          style={styles.container}
        >
          <View style={{ width: 250 }}>
            {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
            <TextField value={email} name="email" onChangeText={this.onChangeText} />
            {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
            <TextField
              value={password}
              name="password"
              onChangeText={this.onChangeText}
              secureTextEntry
            />
            <Button
              buttonStyle={{
                  backgroundColor: "black",
                  height: 50,
                  borderColor: "red",
                  borderWidth: 1,
                  borderRadius: 10
                }}
              raised={true}
              color="red"
              title="Login"
              onPress={this.submit}
            />
            <Text style={{ textAlign: 'center' }}>or</Text>
            <Button
              buttonStyle={{
                  backgroundColor: "black",
                  height: 50,
                  borderColor: "red",
                  borderWidth: 1,
                  borderRadius: 10
                }}
              raised={true}
              color="red" title="Create account" onPress={this.goToSignup} />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      payload {
        token
        user {
          name
          about
          inbox{
            id
          }
          friends{
            id
          }
        }
      }
      error {
        field
        msg
      }
    }
  }
`;

export default graphql(loginMutation)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
