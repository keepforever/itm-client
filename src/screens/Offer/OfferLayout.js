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
import { clearLog } from '../../utils';
import TextField from '../../components/TextField';

const defaultState = {
  values: {
    search: ''
  }

}

class OffersLayout extends React.Component {
  static navigationOptions = {
    title: "OfferLayout",
  };

  state = defaultState

  navToCreateOffer = () => {
   this.props.navigation.navigate('CreateOffer');
  };

  navToSpecificOffer = (offer) => {
    //console.log("offer in navToSpecificOffer: ", offer)
    this.props.selectOfferAction(offer)
    this.props.navigation.navigate('SpecificOffer');
  };

  deleteOffer = (id) => {
    clearLog("deleteOffer arg, ", id)
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
    clearLog("editOffer arg", id)
  }

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
    // refetch the query as we type
    this.props.listOffers.refetch({
      where: {
        title_contains: value
      }
    })
  };

  render() {
    // for sorting, graphql give you 'refetch' on the data object (here it's
    // listOffers because of compose, the different Q's and M's are named. )
    // 'variables', also on listOffers, allows us to keep track of the params
    // we are sending to a given query. Here we will use to toggle between sorting
    // by text or title

    const {
      listOffers: { offers, refetch, variables },
      loading, history, userId, specificOffer
    } = this.props
    const { values: { search } } = this.state;

    if (loading || !offers) {
      return null;
    }

    clearLog('specificOffer from state-to-props: ', specificOffer)
    return (
      <View style={styles.container} >
        <View>
          <TextField
            kolor="black"
            value={search}
            name="search..."
            onChangeText={this.onChangeText}
          />
        </View>
        <View style={styles.sortRow}>
          <Button style={styles.sortButton} title="Text" onPress={() => refetch({
            orderBy: variables.orderBy === 'text_ASC' ? 'text_DESC' : 'text_ASC',
          })} />
          <Button style={styles.sortButton} title="Title" onPress={() => refetch({
            orderBy: variables.orderBy === 'title_ASC' ? 'title_DESC' : 'title_ASC',
          })} />
        </View>
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
  },
  sortRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sortButton: {
    flex: 1,
  },
  searchBar: {
    margin: 10,
  },
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
