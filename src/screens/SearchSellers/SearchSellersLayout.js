import React, { Component } from 'react';
import {
  Image, Text, View, Button,
  FlatList, StyleSheet, ActivityIndicator
} from 'react-native';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { OFFERS_QUERY } from '../../graphql/queries/OFFERS_QUERY';
import { DELETE_OFFER } from '../../graphql/mutations/DELETE_OFFER';
import { EDIT_OFFER } from '../../graphql/mutations/EDIT_OFFER';
import SellerRow from '../../components/SellerRow'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { selectSpecificSeller } from '../../store/actions/zseller';
import { clearLog } from '../../utils';
import TextField from '../../components/TextField';

const sellersQuery = gql`
  query {
    zsellers{
      id
      name
      about
      sells
      patrons{
        name
      }
    }
  }
`;


class SearchSellersLayout extends Component {
  static navigationOptions = {
    title: "SearchSellersLayout",
  };

  navToSpecificSeller = (seller) => {
    this.props.selectSellerAction(seller)
    clearLog("navToSpecificSeller, seller:", seller)
    // this.props.selectOfferAction(offer)
    // this.props.navigation.navigate('SpecificOffer');
  };

  state = {
    someThing: 'some state'
  }

  render() {

    const {
      listSellers: {
        zsellers,
        variables,
        fetchMore,
        loading,
      },
      userId,
      zseller
    } = this.props

    clearLog('SearchSellersLayout, zseller', zseller)
    //clearLog("SearchSellersLayout, listSellers", this.props.listSellers )

    return (
      <View style={styles.container}>
        <Text>
          SearchSellersLayout
        </Text>
        <FlatList
          keyExtractor={item => item.id }
          data={zsellers}
          renderItem={({ item }) => (
            <SellerRow
              userId={userId}
              item={item}
              viewThisSeller={this.navToSpecificSeller}
            />
          )}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
    return {
        userId: state.user.userId,
        zseller: state.zseller.seller
    };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({selectSellerAction: selectSpecificSeller}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(compose(
  graphql(sellersQuery, {
    options: {
      fetchPolicy: "cache-and-network",
      variables: {
        orderBy: 'createdAt_ASC'
      }
    },
    name: "listSellers"
  }),
)(SearchSellersLayout));


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    padding: 10
  }
})
