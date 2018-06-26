import React from 'react';
import { AsyncStorage, Text, Button, View } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
  static navigationOptions = {
    title: "Login Layout",
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
    const response = await this.props.mutate({
      variables: this.state.values,
    });
    //console.log("SUBMIT LOGIN")
    // before adjusting server
    //const { token, error } = response.data.login;
    const { payload, error } = response.data.login;
    if (payload) {
      console.log('Login Token', payload.token)
      await AsyncStorage.setItem('userToken', payload.token);
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
    //alert('this button does not work')
    this.props.navigation.navigate('SignUp')
  };

  render() {
    //console.log("LOGIN_LAYOUT", this.props)
    const { errors, values: { email, password } } = this.state;

    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ width: 200 }}>
          {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
          <TextField value={email} name="email" onChangeText={this.onChangeText} />
          {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
          <TextField
            value={password}
            name="password"
            onChangeText={this.onChangeText}
            secureTextEntry
          />
          <Button title="Login" onPress={this.submit} />
          <Text style={{ textAlign: 'center' }}>or</Text>
          <Button title="Create account" onPress={this.goToSignup} />
        </View>
      </View>
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
