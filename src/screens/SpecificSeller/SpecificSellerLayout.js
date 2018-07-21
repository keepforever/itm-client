import React from 'react';
import {
  Image, ScrollView, View, TouchableHighlight,
  FlatList, StyleSheet,
} from 'react-native';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { OFFERS_QUERY } from '../../graphql/queries/OFFERS_QUERY';
import { DELETE_OFFER } from '../../graphql/mutations/DELETE_OFFER';
import { ADD_SELLER_TO_FRIENDS } from '../../graphql/mutations/ADD_SELLER_TO_FRIENDS';
import OfferRow from '../../components/OfferRow';
import { connect } from 'react-redux';
import { clearLog } from '../../utils';
import { Card, Text, ListItem, Button } from 'react-native-elements'
import cardHeaderImage from './sellerCardHeader.jpg'
import TextField from '../../components/TextField';
import CustomHeaderBack from '../../components/CustomHeaderBack'

const defaultState = {
  values: {
    friendsBecause: [],
    offerAllowance: 1,
    friendsBecauseReason:'',
  },
  errors: {},
  isSubmitting: false,
  modalVisible: false,
}

const pickerValues = [...Array(10).keys()]

class SpecificSeller extends React.Component {
  static navigationOptions = ({navigation}) => {
    const title = navigation.getParam('sellerName')
    return {
      title: `Seller Info`,
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

  state = defaultState

  navToBefriendConfig = () => {
   this.props.navigation.navigate('BefriendConfig');
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  };

  addFriendShipReason(reason) {
    const currentReasons = [...this.state.values.friendsBecause]
    //clearLog('currentReasons', currentReasons)

    const updatedReasons = currentReasons.push(reason)

    this.setState(state => ({
      values: {
        ...state.values,
        friendsBecause: updatedReasons,
        friendsBecauseReason: 'Add Another Reason'
      },
    }));

  }

  submit = async (values) => {
    const { friend, friendsBecause, offerAllowance } = values;

    const { variables } = this.props.specificSeller
    //clearLog("EDIT_OFFER_LAYOUT, variables", variables)
    let response;
    try {
      response = await this.props.editOffer({
        variables: {
          id,
          text,
          title,
        },
        // update: (store, { data: { updateOffer } }) => {
        //   const data = store.readQuery({ query: OFFERS_QUERY, variables });
        //
        //   data.offersConnection.edges = data.offersConnection.edges.map(o =>
        //     (o.node.id === updateOffer.id
        //       ? { __typename: 'Node', cursor: updateOffer.id, node: updateOffer }
        //       : o));
        //   store.writeQuery({ query: OFFERS_QUERY, data, variables });
        // }
      });
    } catch (err) {
      console.log('there was an error');
      console.log(err);
      return;
    }

    //clearLog('response', response)

    this.props.navigation.navigate('Offer');
  };

  render() {
    const { specificSeller: { name, about, sells } } = this.props
    const { friendsBecauseReason, offerAllowance } = this.state.values

    //clearLog('SPECIFIC_SELLER_LAYOUT, state', this.state)
    //clearLog('SPECIFIC_SELLER_LAYOUT, about', about)
    //clearLog('SPECIFIC_SELLER_LAYOUT, specificSeller', this.props.specificSeller)
    return (
      <ScrollView style={styles.container} >
        <View style={styles.cardContainer}>
          <Card
            containerStyle={{
              backgroundColor: '#D3D3D3'
            }}
            title={name}
            image={cardHeaderImage}>
            <Text h4>About:</Text>
            <Text style={{marginBottom: 10}}>
              {about}
            </Text>
            <Text h4>Sells:</Text>
            <View style={styles.sellsWrap}>
              {sells.map((s, i) => {
                return i === (sells.length - 1) ? <Text key={i}>{s}.</Text> : <Text key={i}>{s}, </Text>
                {/* <ListItem hideChevron={true} key={i} title={s} /> */}
              })}
            </View>
            <Button
              onPress={this.navToBefriendConfig}
              icon={{name: 'face'}}
              backgroundColor='black'
              buttonStyle={{
                borderRadius: 0,
                borderWidth: 1,
                borderColor: 'white',
                marginTop: 10,
                marginRight: 0,
                marginBottom: 5
              }}
              title='Add Seller' />
          </Card>
        </View>
      </ScrollView>
    );
  }
};

const mapStateToProps = state => {
    return {
        userId: state.user.userId,
        specificSeller: state.seller.sellerInfo
    };
}

export default connect(mapStateToProps)(graphql(ADD_SELLER_TO_FRIENDS, {
  options: { fetchPolicy: "cache-and-network" },
  name: "addSellerToFriendsMutation"
})(SpecificSeller))

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "black",
  },
  modalContainer: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    marginTop: 22,
  },
  texTag: {
    fontSize: 20
  },
  cardContainer: {
    marginBottom: 15
  },
  sellsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
