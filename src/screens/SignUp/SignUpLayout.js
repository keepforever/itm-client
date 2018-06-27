import React, {Component} from 'react';
import { AsyncStorage, Text, Button, View } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import TextField from './TextField';

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
  static navigationOptions = {
    title: "SignUp Layout",
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

    isEmailValid = await pattern.test(this.state.values.email)

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
      this.setState({
        errors: {
          email: 'Already taken',
        },
        isSubmitting: false,
      });
      return;
    }

    await AsyncStorage.setItem('userToken', response.data.signup.token);
    console.log('token: ', response.data.signup.token)
    this.props.navigation.navigate('AuthLoading');

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
          <TextField value={name} name="name" onChangeText={this.onChangeText} />
          {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
          <TextField value={email} name="email" onChangeText={this.onChangeText} />
          <TextField
            value={password}
            name="password"
            onChangeText={this.onChangeText}
            secureTextEntry
          />
          <Button title="Create account" onPress={this.submit} />
          <Text style={{ textAlign: 'center' }}>or</Text>
          <Button title="Login" onPress={this.goToLoginPage} />
          <Button title="Get Data" onPress={this.getData} />
          <Button title="CLEAR STORAGE" onPress={this.clearStorage} />
          <Button title="LIST STORAGE" onPress={this.listStorage} />
        </View>
      </View>
    );
  }
}

const signUpMutation = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export default graphql(signUpMutation)(Signup);
