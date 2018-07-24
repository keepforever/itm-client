import React from 'react';
import { Image, View, FlatList, StyleSheet } from 'react-native';
import CustomHeader from '../../../../components/CustomHeader'
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { OFFERS_QUERY } from '../../../../graphql/queries/OFFERS_QUERY';
import { DELETE_OFFER } from '../../../../graphql/mutations/DELETE_OFFER';
import { EDIT_OFFER } from '../../../../graphql/mutations/EDIT_OFFER';
import OfferRow from '../../../../components/OfferRow'
import { connect } from 'react-redux'
import { Text, Button } from "react-native-elements";

class SpecificOfferLayout extends React.Component {
  static navigationOptions = ({navigation}) => {
    const title = navigation.getParam('offerTitle')
    return {
      title: `${title}`,
      headerStyle: {
        backgroundColor: 'black',
        height: 50,
        width: '100%'
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 14
      }
    };
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
        <View>
          <Button
            onPress={() => alert('TODO: archive this offer/remove from inbox')}
            icon={{name: 'fingerprint'}}
            backgroundColor='black'
            buttonStyle={{
              width: 250,
              borderRadius: 0,
              borderWidth: 1,
              borderColor: 'white',
              marginTop: 20,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title='ARCHIVE OFFER' />
        </View>
        <View style={styles.textBox}>
          <Text h4 style={styles.texTagHeading}>Title: </Text>
          <Text style={styles.texTag}>{title}</Text>
          <Text h4 style={styles.texTagHeading}>Text:</Text>
          <Text style={styles.texTag}>{text}</Text>
        </View>
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
    backgroundColor: "black",
    padding: 10,
    marginBottom: 0.25,
  },
  textBox: {
    marginTop: 30,
    padding: 10,
  },
  texTagHeading: {
    color: 'white',
  },
  texTag: {
    fontSize: 15,
    color: 'white'
  }
});
