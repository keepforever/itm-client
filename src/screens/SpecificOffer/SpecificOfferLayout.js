import React from 'react';
import { Image, Text, View, Button, FlatList, StyleSheet } from 'react-native';
import CustomHeader from '../../components/CustomHeader'
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { OFFERS_QUERY } from '../../graphql/queries/OFFERS_QUERY';
import { DELETE_OFFER } from '../../graphql/mutations/DELETE_OFFER';
import { EDIT_OFFER } from '../../graphql/mutations/EDIT_OFFER';
import OfferRow from '../../components/OfferRow'
import { connect } from 'react-redux'

class SpecificOfferLayout extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   //clearLog('NAVIGATION', navigation)
  //   return {
  //     headerTitle: <CustomHeader titleText={navigation.state.routeName} />,
  //     headerStyle: {
  //       backgroundColor: '#fff',
  //     },
  //   };
  // };
  static navigationOptions = ( {navigation } ) => {
    return {
      title: navigation.state.routeName,
    }
  };

  navToEditOffer = () => {
   this.props.navigation.navigate('EditOffer');
  };

  // deleteOffer = (id) => {
  //   console.log("deleteOffer arg, ", id)
  //   this.props.deleteOffer({
  //     variables: {
  //       id
  //     },
  //     update: (store) => {
  //       const data = store.readQuery({ query: OFFERS_QUERY });
  //       data.offers = data.offers.filter(o => o.id !== id);
  //       store.writeQuery({ query: OFFERS_QUERY, data });
  //     }
  //   })
  // }

  editOffer = (id) => {
    console.log("editOffer arg", id)
  }

  render() {
    const { specificOffer: { title, text, id } } = this.props

    return (
      <View style={styles.container} >
        <Button
          title="Press Edit This Offer"
          onPress={() => this.navToEditOffer()}/>
        <Text style={styles.texTag}>Specific-Offer:</Text>
        <Text style={styles.texTag}>ID: {id}</Text>
        <Text style={styles.texTag}>TI: {title}</Text>
        <Text style={styles.texTag}>TX: {text}</Text>
      </View>
    );
  }
};

const mapStateToProps = state => {
    return {
        userId: state.user.userId,
        specificOffer: state.offer.specificOffer
    };
}

export default connect(mapStateToProps)(graphql(EDIT_OFFER)(SpecificOfferLayout))

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 0.25,
  },
  texTag: {
    fontSize: 20
  }
});
