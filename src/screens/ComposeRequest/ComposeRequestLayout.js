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
}

class ComposeRequestLayout extends Component {
  static navigationOptions = {
    title: "Choose Wisely",
  };

  state = defaultState

  componentDidMout() {
    clearLog('hello from state', 'hello from state')
    this.setState(state => ({
      values: {
        ...state.values,
        author: this.props.userId,
        recipient: this.props.sellerInfo.id
      },
    }));
    clearLog('hello from state', 'hello from state')
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

    console.log('CREATE_OFFER_LAYOUT', this.props)
    const {
      specificSeller: {
        name,
        sells,
        about,
      },
      userId,
    } = this.props



    //clearLog('COMPOSE_REQUEST props', this.props)
    clearLog('COMPOSE_REQUEST state', this.state)
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
