import React from 'react';
import {
  Image, ScrollView, View, TouchableHighlight,
  FlatList, StyleSheet, Modal, Picker, KeyboardAvoidingView
} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { ADD_SELLER_TO_FRIENDS } from '../../graphql/mutations/ADD_SELLER_TO_FRIENDS';
import OfferRow from '../../components/OfferRow';
import { connect } from 'react-redux';
import { clearLog } from '../../utils';
import { Card, Text, ListItem, Button, ButtonGroup } from 'react-native-elements'
import TextField from '../../components/TextField';
import { Icon } from 'expo';

const defaultState = {
  values: {
    friendsBecause: [],
    offerAllowance: 1,
  },
  errors: {},
  isSubmitting: false,
  modalVisible: false,
  friendsBecauseReason:'',
  selectedIndex: 0,
}

const pickerValues = [...Array(10).keys()]

class BefriendSpecificSellerConfig extends React.Component {
  static navigationOptions = ( { navigation } ) => {
    return {
      title: navigation.state.routeName,
    }
  };

  state = defaultState

  befriendSeller = () => {
    const seller = this.props.specificSeller
    clearLog('befriendSeller', seller )
  };

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  };

  onChangeReasonText = (key, value) => {
    this.setState(state => ({
      ...state,
      friendsBecauseReason: value,
    }));
  };

  addFriendShipReason(reason) {
    if(reason.length === 0) {
      this.setState(state => ({
        ...state,
        friendsBecauseReason: ''
      }));
      return
    }
    const updatedReasons = [
      ...this.state.values.friendsBecause,
      reason
    ]
    clearLog('updatedReasons', updatedReasons)

    this.setState(state => ({
      values: {
        ...state.values,
        friendsBecause: updatedReasons,
      },
      friendsBecauseReason: ''
    }));

  }

  cancelBefriendSeller = () => {
   this.props.navigation.navigate('SpecificSeller');
  };

  removeFriendshipReason = (index) => {
    //clearLog('index', index)
    const curRe = [ ...this.state.values.friendsBecause ]
    //clearLog('currentReasons', curRe)
    const updatedReasons = curRe.filter( (el) => { return el !== curRe[index] })
    //clearLog('updatedReasons', updatedReasons)
    this.setState(state => ({
      values: {
        ...state.values,
        friendsBecause: updatedReasons,
      },
      friendsBecauseReason: ''
    }));
  }

  updateIndex = (selectedIndex) => {
    const localButtons = [1,2,3,4]

    const offerAllowance = localButtons[selectedIndex]

    this.setState(state => ({
      values: {
        ...state.values,
        offerAllowance,
      },
      selectedIndex
    }));
  }

  submit = async () => {
    const { friendsBecause, offerAllowance } = this.state.values;

    const id = this.props.specificSeller.id

    clearLog("SUBMIT, friend", id)
    clearLog("SUBMIT, friendsBecause", friendsBecause)
    clearLog("SUBMIT, offerAllowance", offerAllowance)
    clearLog("SUBMIT, addSellerToFriendsMutation", this.props.addSellerToFriendsMutation)

    let response;
    try {
      response = await this.props.mutate({
        variables: {
          id,
          friendsBecause,
          offerAllowance,
        }
      });
    } catch (err) {
      clearLog('response', response)
      clearLog('ERROR submitting addSellerToFriendsMutation', err);
      return;
    }

    clearLog('RESPONSE addSellerToFriendsMutation', response)

    this.props.navigation.navigate('Home');
  };

  render() {
    const { specificSeller: { name, about, sells } } = this.props
    const { friendsBecauseReason, selectedIndex } = this.state
    const { offerAllowance, friendsBecause } = this.state.values

    let listOfReasons = null;
    if (friendsBecause.length > 0) {
      listOfReasons = (
        friendsBecause.map((reason, index) => {
          return (
            <View key={index}>
              <Text >{reason}</Text>
              <TouchableHighlight
                onPress={() => this.removeFriendshipReason(index)}>
                <Icon.Ionicons
                  name="ios-nuclear-outline"
                  size={26}
                  color="red"
                />
              </TouchableHighlight>
            </View>
          )
        })
      )
    }
    // choices for ButtonGroup:
    const buttons = ["1","2","3","4"]

    //clearLog(`BEFRIEND_SPECIFIC_SELLER_CONFIG friendsBecause`, friendsBecause)
    //clearLog('SPECIFIC_SELLER_LAYOUT, about', about)
    //clearLog('SPECIFIC_SELLER_LAYOUT, specificSeller', this.props.specificSeller)
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={{marginTop: 15}}>
          <Button
            onPress={this.submit}
            icon={{name: 'face'}}
            backgroundColor='green'
            title='Add Friend'
          />
        </View>
        <ScrollView>
          <View >
            <Text h4>Set Offer Allowance:</Text>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{height: 100}}
            />
          </View>
          <View>
            <TextField
              kolor="black"
              value={friendsBecauseReason}
              name="Reason to befriend..."
              onChangeText={this.onChangeReasonText}
            />
            <Button
              onPress={() => {
                this.addFriendShipReason(friendsBecauseReason);
              }}
              icon={{name: 'face'}}
              backgroundColor='black'
              title='Push Reason'
            />
          </View>
          {listOfReasons}
          <View style={{marginTop: 15}}>
            <Button
              onPress={this.cancelBefriendSeller }
              icon={{name: 'face'}}
              backgroundColor='red'
              title='Cancel Add Seller'
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
};

const mapStateToProps = state => {
    return {
        userId: state.user.userId,
        specificSeller: state.seller.sellerInfo
    };
}

const addFriendMutation = gql`
  mutation (
    $id: ID!,
    $friendsBecause: [String!]!,
    $offerAllowance: Int!
  ) {
    createFriendship(data:{
      friendsBecause: {set: $friendsBecause},
      friend:{connect:{id:$id}},
      offerAllowance: $offerAllowance
    }) {
      id
      friend{
        name
      }
      offerAllowance
    }
  }
`;

export default connect(mapStateToProps)(graphql(addFriendMutation)(BefriendSpecificSellerConfig))

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    padding: 25
  },
});
