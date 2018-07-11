import React, { Component } from "react";
import { Text } from "react-native-elements";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
} from "react-native";
import OfferRow from '../../components/OfferRow';
import TextField from '../../components/TextField';
// GraphQL Imports
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
//Q's & M's
import { OFFERS_QUERY_NO_PAGEINATE } from '../../graphql/queries/OFFERS_QUERY_NO_PAGEINATE';
import { CREATE_OFFER } from '../../graphql/mutations/CREATE_OFFER';
import { CREATE_OFFER_OVERHALL } from '../../graphql/mutations/CREATE_OFFER_OVERHALL';
import { clearLog } from '../../utils';

const defaultState = {
  values: {
    title: '',
    text: '',
    expiresAt: '2019-07-04T05:48:36.648Z',
    id: 'cjjhknwkchrj40b37ajndxl3u'
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

    const {title, text, expiresAt, id} = this.state.values

    const { variables } = this.props.listOffers

    this.setState({ isSubmitting: true });
    let response;
    try {
      response = await this.props.createOffer({
        variables: {
          title,
          text,
          expiresAt,
          id
        }, // TODO: update won't work until i add offersConnection to gql-service
        // update: (store, {data: { createOffer }}) => {
        //   const data = store.readQuery( { query: OFFERS_QUERY_NO_PAGEINATE, variables } );
        //   data.offersConnection.edges = [
        //     { __typename: 'Node', cursor: createOffer.id, node: createOffer },
        //     ...data.offersConnection.edges,
        //   ];
        //   // data.offersConnection.edges.filter(o => o.node.id !== id);
        //   store.writeQuery({ query: OFFERS_QUERY_NO_PAGEINATE, data, variables });
        // },
      });
    } catch(error) {
      console.log(error)
      return
    }
    clearLog('CRE_OFF response', response)
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
    const {
      listOffers: {
        // offersConnection = {pageInfo: {}, edges: []},
        variables,
        loading,
      },
      history
    } = this.props

    clearLog('loading', loading)

    if (loading) {
      return null;
    }

    //console.log('CreateOfferLayout: ', offersWithKey[0]);
    let offersMap = {}; // to help address keys error in lue of adding random number
    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}

export default compose(
  graphql(CREATE_OFFER_OVERHALL, {
    options: { fetchPolicy: "cache-and-network" },
    name: "createOffer"
  }),
  graphql(OFFERS_QUERY_NO_PAGEINATE, {
    options: {
      fetchPolicy: "cache-and-network",
      variables: {
        orderBy: 'createdAt_ASC'
      }
    },
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
