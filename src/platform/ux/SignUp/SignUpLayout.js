import React, {Component} from 'react';
import { AsyncStorage, Text, Button, View } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import TextField from '../../../core/components/TextField';

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
    console.log('userToken: ', response.data.signup.token)
    // this.setState(defaultState);
    //this.props.history.push('/products');
  };

  goToLoginPage = () => {
    //this is for a different React Native Navigation Library
    //this.props.history.push('/login');
    console.log(this.props)
    //this.props.navigation.navigate('LogIn')
    //alert('no functionality yet')
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

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
          <Button title="Login" onPress={() => this.goToLoginPage()} />
          <Button title="Get Data" onPress={this.getData} />
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
