import React, { Component } from "react";
import { Text } from "react-native-elements";
import {
  FlatList,
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  TouchableHighlight
} from "react-native";
import OfferRow from '../../components/OfferRow';
import TextField from '../../components/TextField';
// GraphQL Imports
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
//Q's & M's
import { OFFERS_QUERY } from '../../graphql/queries/OFFERS_QUERY';
import { CREATE_OFFER } from '../../graphql/mutations/CREATE_OFFER';

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
      response = await this.props.createOffer({
        variables: {
          title,
          text
        },
        update: (store, { data: { createOffer } }) => {
          //console.log("IN-UPDATE: ", createOffer)
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: OFFERS_QUERY });
          // Add our comment from the mutation to the end.
          data.offers.push(createOffer);
          // Write our data back to the cache.
          store.writeQuery({ query: OFFERS_QUERY, data });
        },
      });
    } catch(error) {
      console.log(error)
      return
    }
    //console.log('CRE_OFF response', response)
    this.setState({
      isSubmitting: false,
      values: {
        ...defaultState.values
      }
     });

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
    //console.log('CREATE_OFFER_LAYOUT', this.props)
    const { listOffers: { offers }, loading, history } = this.props

    if (loading || !offers) {
      return null;
    }

    const offersWithKey = offers.map(offer => ({
      ...offer,
      key: offer.id,
    }));

    //console.log('CreateOfferLayout: ', offersWithKey[0]);

    return (
      <View style={styles.container}>
        <Text>Create Offer Layout Welcomes You!</Text>
        <Button title="Nav Home" onPress={this.navToHome} />
        <TextField
          kolor="black"
          value={title}
          name="title"
          onChangeText={this.onChangeText}
        />
        <TextField
          kolor="black"
          value={text}
          name="text"
          onChangeText={this.onChangeText}
        />
        <Button title="Add Offer" onPress={this.submit} />
        <FlatList
          data={offersWithKey}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
              <Text>{item.text}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default compose(
  graphql(CREATE_OFFER, {
    options: { fetchPolicy: "cache-and-network" },
    name: "createOffer"
  }),
  graphql(OFFERS_QUERY, {
    options: { fetchPolicy: "cache-and-network" },
    name: "listOffers"
  }),
)(CreateOfferLayout);


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 5
  }
});


// const createOfferMutation = gql`
//   mutation($title: String!, $text: String!) {
//     createOffer(title: $title, text: $text){
//       id
//       title
//       text
//     }
//   }
// `
// const offersQuery = gql`
//   {
//     offers {
//       id
//       text
//       title
//     }
//   }
// `;
