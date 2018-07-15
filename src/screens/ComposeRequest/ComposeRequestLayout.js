import React, { Component } from "react";
import { Text } from "react-native-elements";
import {
  View, ScrollView, KeyboardAvoidingView, StyleSheet, Button,
  TouchableHighlight,
} from "react-native";
import { Icon } from 'expo';
// Custom Components
import OfferRow from '../../components/OfferRow';
import TextField from '../../components/TextField';
import MultilineTextField from '../../components/MultilineTextField';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// GraphQL Imports
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
//Q's & M's
import { selectSpecificSeller } from '../../store/actions/seller';
import { CREATE_REQUEST } from '../../graphql/mutations/CREATE_REQUEST';
// Helper
import { clearLog } from '../../utils';


const defaultState = {
  values: {
    author: '',
    recipient: '',
    title: '',
    text: '',
    wants: [],
  },
  errors: {},
  isSubmitting: false,
  pendingWant: ''
}

class ComposeRequestLayout extends Component {
  static navigationOptions = {
    title: "Choose Wisely",
  };

  state = defaultState

  componentDidMount() {
    this.setState(state => ({
      values: {
        ...state.values,
        author: this.props.userId,
        recipient: this.props.specificSeller.id
      },
    }));
  }

  navToHome = () => {
   this.props.navigation.navigate('Home');
  };

  submit = async () => {
    if (this.state.isSubmitting) {
      return;
    }

    const {title, text, expiresAt, id} = this.state.values

    const { variables } = this.props.listOffers

    clearLog('VARIABLES', variables)

    this.setState({ isSubmitting: true });
    let response;
    try {
      response = await this.props.createRequestMutation({
        variables: {
          recipient,
          author,
          title,
          text
        },
      });
    } catch(error) {
      console.log(error)
      return
    }
    clearLog('CREATE_OFFER response', response)
    this.setState({
      isSubmitting: false,
      values: {
        ...defaultState.values
      }
     });

  };

  addWant(want) {
    if(want.length === 0) {
      this.setState(state => ({
        ...state,
        pendingWant: ''
      }));
      return
    }
    const updatedWants = [
      ...this.state.values.wants,
      want.trim()
    ]
    clearLog('updatedReasons', updatedWants)

    this.setState(state => ({
      values: {
        ...state.values,
        wants: updatedWants,
      },
      pendingWant: ''
    }));
  }

  removeWant = (index) => {
    //clearLog('index', index)
    const curWants = [ ...this.state.values.wants ]
    //clearLog('currentReasons', curRe)
    const updatedWants = curWants.filter( (w) => { return w !== curWants[index] })
    //clearLog('updatedReasons', updatedReasons)
    this.setState(state => ({
      values: {
        ...state.values,
        wants: updatedWants,
      },
      friendsBecauseReason: ''
    }));
  }

  onChangeWantsText = (key, value) => {
    this.setState(state => ({
      ...state,
      pendingWant: value,
    }));
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

    const { pendingWant, errors, values: { title, text, wants } } = this.state;

    const { specificSeller: { name, sells, about }, userId } = this.props;

    let listOfWants = null;
    if (wants.length > 0) {
      listOfWants = (
        wants.map((want, index) => {
          return (
            <View style={{
              flexDirection: 'row',
              width: '80%',
              justifyContent: 'space-around'
            }} key={index}>
              <Text h4 >{want}</Text>
              <TouchableHighlight
                onPress={() => this.removeWant(index)}>
                <Icon.Ionicons
                  name="ios-nuclear-outline"
                  size={36}
                  color="red"
                />
              </TouchableHighlight>
            </View>
          )
        })
      )
    }
    // choices for ButtonGroup:


    // console.log('CREATE_OFFER_LAYOUT', this.props)

    //clearLog('COMPOSE_REQUEST props', this.props)
    clearLog('COMPOSE_REQUEST state', this.state)
    return (
      <ScrollView>
        <View style={styles.container}>
          <Button title="Nav Home" onPress={this.navToHome} />
          <View>
            <Text h4>
              Request Title:
            </Text>
          </View>
          <TextField
            kolor="black"
            value={title}
            name="title"
            onChangeText={this.onChangeText}
          />
          <View>
            <Text h4>
              Request Text:
            </Text>
          </View>
          <TextField
            kolor="black"
            value={text}
            name="text"
            onChangeText={this.onChangeText}
          />
          <View>
            <Text h4>
              Create Wants List:
            </Text>
          </View>
          <TextField
            kolor="black"
            value={pendingWant}
            name="enter want"
            onChangeText={this.onChangeWantsText}
          />
          <Button
            onPress={() => {
              this.addWant(pendingWant);
            }}
            icon={{name: 'face'}}
            backgroundColor='black'
            title='Push Want'
          />
          <Button title="Send Request" onPress={this.submit} />
          {listOfWants}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
    return {
        userId: state.user.userId,
        specificSeller: state.seller.sellerInfo
    };
}

// Dispatch not currently being invoked in this Screen.
// May use later.
const mapDispatchToProps = dispatch => {
  return bindActionCreators({selectSellerAction: selectSpecificSeller}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  graphql(CREATE_REQUEST, {
    options: { fetchPolicy: "cache-and-network" },
    name: "createRequestMutation"
  })(ComposeRequestLayout));


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 5
  }
});
