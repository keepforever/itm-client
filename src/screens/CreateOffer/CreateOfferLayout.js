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
import { clearLog } from '../../utils';

const offersQuery = gql`
  query($after: String, $orderBy: OfferOrderByInput, $where: OfferWhereInput) {
    offersConnection(after: $after, orderBy: $orderBy, where: $where) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          text
          author {
            id
            name
          }
        }
      }
    }
  }
`;

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

    const { variables } = this.props.listOffers

    this.setState({ isSubmitting: true });
    let response;
    try {
      response = await this.props.createOffer({
        variables: {
          title,
          text
        },
        update: (store, {data: { createOffer }}) => {
          const data = store.readQuery( { query: offersQuery, variables } );
          data.offersConnection.edges = [
            { __typename: 'Node', cursor: createOffer.id, node: createOffer },
            ...data.offersConnection.edges,
          ];
          // data.offersConnection.edges.filter(o => o.node.id !== id);
          store.writeQuery({ query: offersQuery, data, variables });
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
    const {
      listOffers: {
        offersConnection = {pageInfo: {}, edges: []},
        variables,
        loading,
      },
      history
    } = this.props

    clearLog('loading', loading)

    if (loading || !offersConnection) {
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
        <FlatList
          keyExtractor={item => item.id }
          data={offersConnection.edges
            .map(x => ({
              ...x.node,
            }))
          .filter((x) => {
            if(offersMap[x.id]) {
              return false
            }
            offersMap[x.id] = 1
            return true
          })}
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
  graphql(offersQuery, {
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
