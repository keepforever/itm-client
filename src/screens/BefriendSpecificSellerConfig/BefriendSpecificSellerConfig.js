import React from 'react';
import {
  Image, ScrollView, View, TouchableHighlight,
  FlatList, StyleSheet, Modal, Picker
} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import OfferRow from '../../components/OfferRow';
import { connect } from 'react-redux';
import { clearLog } from '../../utils';
import { Card, Icon, Text, ListItem, Button, ButtonGroup } from 'react-native-elements'
import TextField from '../../components/TextField';
import { resetSellerInfo } from '../../store/actions/seller';
import { bindActionCreators } from 'redux';
import { ADD_SELLER_TO_FRIENDS } from '../../graphql/mutations/ADD_SELLER_TO_FRIENDS';

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

class BefriendSpecificSellerConfig extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {routeName} = navigation.state
    return {
      title: `${routeName}`,
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
    const curRe = [ ...this.state.values.friendsBecause ]
    const updatedReasons = curRe.filter( (el) => { return el !== curRe[index] })
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
    // clearLog("SUBMIT, friend", id)
    // clearLog("SUBMIT, friendsBecause", friendsBecause)
    // clearLog("SUBMIT, offerAllowance", offerAllowance)
    // clearLog("SUBMIT, addSellerToFriendsMutation", this.props.addSellerToFriendsMutation)

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

    this.setState({ ...defaultState })
    //this.props.resetSellerAction()
    this.props.navigation.navigate('PatronInbox');

  };

  render() {
    const component1 = () => (
      <Icon
        color='black'
        size={30}
        containerStyle={{
          backgroundColor: 'red'
      }}
      name='filter-1' />)
    const component2 = () => (
      <Icon
        color='black'
        size={30}
        containerStyle={{
          backgroundColor: 'red'
      }}
      name='filter-2' />)
    const component3 = () => (
      <Icon
        color='black'
        size={30}
        containerStyle={{
          backgroundColor: 'red'
      }}
      name='filter-3' />)
    const component4 = () => (
      <Icon
        color='black'
        size={30}
        containerStyle={{
          backgroundColor: 'red'
        }}
    name='filter-4' />)

    // const buttons = ["1","2","3","4"]
    const altButtons = [{ element: component1 }, { element: component2 }, { element: component3 }, { element: component4 }]

    const { specificSeller: { name, about, sells } } = this.props
    const { friendsBecauseReason, selectedIndex } = this.state
    const { offerAllowance, friendsBecause } = this.state.values

    let listOfReasons = null;
    if (friendsBecause.length > 0) {
      listOfReasons = (
        friendsBecause.map((reason, index) => {
          return (
            <View key={index}>
              <Text style={{color: 'white', marginTop: 10}}>Reasons: </Text>
              <Text style={styles.reasons} >{reason}</Text>
              <TouchableHighlight
                onPress={() => this.removeFriendshipReason(index)}>
                <Icon
                  name="delete"
                  size={26}
                  color="red"
                />
              </TouchableHighlight>
            </View>
          )
        })
      )
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <View >
            <Text h5 style={{color: 'white'}}>Set Offer Allowance:</Text>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              selectedButtonStyle={{
                backgroundColor: '#555555'
              }}
              buttons={altButtons}
              containerStyle={{
                height: 60,
                backgroundColor: 'transparent',
                borderWidth: 0
              }}
            />
          </View>
          <View>
            <TextField
              kolor="white"
              value={friendsBecauseReason}
              name="Reason you like seller..."
              onChangeText={this.onChangeReasonText}
            />
            <Button
              buttonStyle={{
                borderWidth: 1,
                borderColor: 'white',
                marginTop: 5,
              }}
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
              color="red"
              buttonStyle={{
                borderWidth: 1,
                borderColor: 'red',
                marginTop: 5,
              }}
              onPress={this.cancelBefriendSeller }
              icon={{name: 'cancel', color: 'red'}}
              backgroundColor='black'
              title='Cancel'
            />
          </View>
          <Button
            onPress={this.submit}
            icon={{name: 'face'}}
            backgroundColor='black'
            buttonStyle={{
              borderWidth: 1,
              borderColor: 'green',
              marginTop: 15,
            }}
            title='Add Friend'
          />
        </ScrollView>
      </View>
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({resetSellerAction: resetSellerInfo}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(graphql(addFriendMutation)(BefriendSpecificSellerConfig))

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "black",
    padding: 25
  },
  reasons: {
    color: 'white',
  }
});
