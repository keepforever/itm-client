import React, { Component } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  TouchableHighlight
} from "react-native";

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Text } from "react-native-elements";

class OfferLayout extends Component {
  static navigationOptions = {
    title: "OfferLayout",
  };
  state = {
    someThing: "some state"
  };
  navToCreateOffer = () => {
   this.props.navigation.navigate('CreateOffer');
  };

  render() {
    //make sure query resolves before trying to display fetched data
    if(this.props.data.loading) {
      return (<View>Loading!</View>)
    }
    if(this.props.data.error) {
      console.log(this.props.data.error)
      return (<View>An Error Occured!</View>)
    }
    ///////////////////////^ House Keeping ^/////////////////////////////
    const { offer } = this.props.data
    console.log("OFFER LAYOUT offer ", offer)
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Button
            title="Back to Home"
            onPress={this._showMoreApp} />
            <View>
              <Text>Offer Title: {offer.title}</Text>
              <Text>Offer Text: {offer.text} </Text>
            </View>
            <Button
              title="Nav to CreateOffer"
              onPress={this.navToCreateOffer}
            />
        </View>
      </View>
    );
  }
  _showMoreApp = () => {
   this.props.navigation.navigate('Home');
 };
}

const offerQuery = gql`
  query($id: ID!) {
    offer(id: $id) {
      text
      title
    }
  }
`;

export default graphql(offerQuery,{
  options: {
    variables: {
      id: "cjiw228ub2vuz0a21xvzphr2z"
    }
  }
})(OfferLayout)


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    padding: 10
  }
});
