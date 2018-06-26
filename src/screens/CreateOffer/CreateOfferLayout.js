import React, { Component } from "react";
import { Text } from "react-native-elements";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  TouchableHighlight
} from "react-native";
import TextField from '../../components/TextField';
// GraphQL Imports
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const defaultState = {
  values: {
    title: '',
    text: '',
  },
  errors: {},
  isSubmitting: false,
}

class CreateOfferLayout extends Component {
  static navigationOptions = {
    title: "CreateOfferLayout",
  };
  state = defaultState
  navToHome = () => {
   this.props.navigation.navigate('Home');
  };

  submit = async () => {
    if (this.state.isSubmitting) {
      return;
    }
    const {title, text} = this.state.values
    this.setState({ isSubmitting: true });
    let response;
    try {
      response = await this.props.mutate({
        variables: {
          title,
          text
        }
      });
    } catch(error) {
      console.log(error)
    }
    console.log('CRE_OFF response', response)

    this.setState({ isSubmitting: false });
  };

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  };

  render() {
    const { errors, values: { title, text } } = this.state;

    return (
      <View style={styles.container}>
        <Text>Create Offer Layout Welcomes You!</Text>
        <Button title="Nav Home" onPress={this.navToHome} />
        <TextField
          value={title}
          name="title"
          onChangeText={this.onChangeText}
        />
        <TextField
          value={text}
          name="text"
          onChangeText={this.onChangeText}
        />
        <Button title="Add Offer" onPress={this.submit} />
      </View>
    );
  }
}

const createOfferMutation = gql`
  mutation($title: String!, $text: String!) {
    createOffer(title: $title, text: $text){
      id
    }
  }
`

export default graphql(createOfferMutation)(CreateOfferLayout)


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    padding: 10
  }
});
