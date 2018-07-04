import React, { Component } from "react";
import { Text } from "react-native-elements";
import {
  FlatList,  View, ScrollView, KeyboardAvoidingView,
  StyleSheet, Button, TouchableHighlight
} from "react-native";
import OfferRow from '../../components/OfferRow';
import TextField from '../../components/TextField';
// GraphQL Imports
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
//Q's & M's
import { DELETE_OFFER } from '../../graphql/mutations/DELETE_OFFER';
import { EDIT_OFFER } from '../../graphql/mutations/EDIT_OFFER';
import { OFFERS_QUERY } from '../../graphql/queries/OFFERS_QUERY';
// Redux
import { connect } from 'react-redux';
//helper
import { clearLog } from '../../utils';


const defaultState = {
  values: {
    title: '',
    text: '',
    id: ''
  },
  errors: {},
  isSubmitting: false,
}

class EditOfferLayout extends Component {
  static navigationOptions = {
    title: "EditOfferLayout",
  };
  state = defaultState

  componentDidMount() {
    const { text, title, id } = this.props.specificOffer
    clearLog('EditOfferLayout, COMP_DID_MNT', this.props.specificOffer )
    this.setState({
      values: {
        text,
        title,
        id
      }
    })
  }

  submit = async (values) => {
    const { text, title, id } = values;
    clearLog(" this.props.editOffer ", this.props.editOffer)

    let response;
    try {
      response = await this.props.editOffer({
        variables: {
          id,
          text,
          title,
        },
        // Note, adding filter vars to OFFERS_QUERY breaks update by causing
        // data.offers to come back  undefined.
        // update: (store, { data: { updateOffer } }) => {
        //   // note, 'updateOffer' is named as such due to that being the
        //   // name of the mutation the database knows and responds with.
        //   const data = store.readQuery({ query: OFFERS_QUERY });
        //   clearLog(' DATA ', data)
        //   data.offers = data.offers.map(o => (o.id === updateOffer.id ? updateOffer : o));
        //   store.writeQuery({ query: OFFERS_QUERY, data });
        // },
      });
    } catch (err) {
      console.log('there was an error');
      console.log(err);
      return;
    }

    clearLog('response', response)

    this.props.navigation.navigate('Offer');
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
    const { errors, values: { title, text }, values } = this.state;
    //console.log('CREATE_OFFER_LAYOUT', this.props)
    const { listOffers: { offers }, loading, history } = this.props

    if (loading || !offers) {
      return null;
    }

    return (
      <View style={styles.container}>
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
        <Button title="Submit Offer Edit" onPress={() => this.submit(values)} />
      </View>
    );
  }
}

const mapStateToProps = state => {
    return {
        userId: state.user.userId,
        specificOffer: state.offer.specificOffer
    };
}

export default connect(mapStateToProps) (compose(
  graphql(EDIT_OFFER, {
    options: { fetchPolicy: "cache-and-network" },
    name: "editOffer"
  }),
  graphql(DELETE_OFFER, {
    options: { fetchPolicy: "cache-and-network" },
    name: "deleteOffer"
  }),
  graphql(OFFERS_QUERY, {
    options: { fetchPolicy: "cache-and-network" },
    name: "listOffers"
  }),
)(EditOfferLayout));


//export default connect(null, mapDispatchToProps)(compose(graphql(refreshTokenMutation))((AuthLoadingScreen)))

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 5
  }
});
