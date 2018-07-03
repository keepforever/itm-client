import React from 'react';
import { Image, Text, View, Button, FlatList, StyleSheet } from 'react-native';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { OFFERS_QUERY } from '../../graphql/queries/OFFERS_QUERY';
import { DELETE_OFFER } from '../../graphql/mutations/DELETE_OFFER';
import { EDIT_OFFER } from '../../graphql/mutations/EDIT_OFFER';
import OfferRow from '../../components/OfferRow'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { selectSpecificOffer } from '../../store/actions/offer';

class OffersLayout extends React.Component {
  static navigationOptions = {
    title: "OfferLayout",
  };

  navToCreateOffer = () => {
   this.props.navigation.navigate('CreateOffer');
  };

  navToSpecificOffer = (offer) => {
    //console.log("offer in navToSpecificOffer: ", offer)
    this.props.selectOfferAction(offer)
    this.props.navigation.navigate('SpecificOffer');
  };

  deleteOffer = (id) => {
    console.log("deleteOffer arg, ", id)
    this.props.deleteOffer({
      variables: {
        id
      },
      update: (store) => {
        const data = store.readQuery({ query: OFFERS_QUERY });
        data.offers = data.offers.filter(o => o.id !== id);
        store.writeQuery({ query: OFFERS_QUERY, data });
      }
    })
  }
  editOffer = (id) => {
    console.log("editOffer arg", id)
  }

  render() {
    const { listOffers: { offers }, loading, history, userId, specificOffer } = this.props
    //console.log('OFFERLAYOUT props: ', this.props)
    //console.log("OfferLayout, this.props.userId: ", userId )

    if (loading || !offers) {
      return null;
    }
    //console.log('OFFER_LAYOUT, offers[0]:', offers[0]);
    console.log('OFFER_LAYOUT, specificOffer from state-to-props: ', specificOffer)

    return (
      <View style={styles.container} >
        <Button
          title="Nav to CreateOffer"
          onPress={this.navToCreateOffer}
        />
        <Text style={{ marginTop: 10, fontSize: 20 }}>Offers:</Text>
        <FlatList
          keyExtractor={item => item.id}
          data={offers.map(x => ({ ...x, showButtons: userId === x.author.id }))}
          renderItem={({ item }) => (
            <OfferRow
              offerAuthorId={item.author.id}
              userId={userId}
              item={item}
              edit={this.editOffer}
              delete={this.deleteOffer}
              showButtons={item.showButtons}
              viewThisOffer={this.navToSpecificOffer}
            />
          )}
        />
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({selectOfferAction: selectSpecificOffer}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(compose(
  graphql(OFFERS_QUERY, {
    options: { fetchPolicy: "cache-and-network" },
    name: "listOffers"
  }),
  graphql(DELETE_OFFER, {
    name: 'deleteOffer'
  }),
)(OffersLayout));

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 0.25
  }
});














// const offersQuery = gql`
//   {
//     offers {
//       id
//       text
//       title
//     }
//   }
// `;


// don't need to do this after using keyExtraction property on FlatList
// const offersWithKey = offers.map(offer => ({
//   ...offer,
//   key: offer.id,
// }));


{/* <View style={styles.row}>
  <Image
    style={styles.images}
    source={{ uri: `http://via.placeholder.com/250x250` }}
  />
  <View style={styles.right}>
    <Text style={styles.text}>{item.text}</Text>
    <Text style={styles.title}>{item.title}</Text>
  </View>
</View> */}
