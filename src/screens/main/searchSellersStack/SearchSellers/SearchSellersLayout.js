import React, { Component } from 'react';
import {
  Image, Text, View,
  FlatList, StyleSheet, ActivityIndicator
} from 'react-native';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { OFFERS_QUERY } from '../../../../graphql/queries/OFFERS_QUERY';
import { SELLERS_QUERY } from '../../../../graphql/queries/SELLERS_QUERY';
// import SellerRow from '../../components/SellerRow'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { selectSpecificSeller } from '../../../../store/actions/seller';
import { clearLog } from '../../../../utils';
import TextField from '../../../../components/TextField';
import { Card, Button } from 'react-native-elements'
import SearchSellerCard from '../../../../components/SearchSellerCard'


class SearchSellersLayout extends Component {
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

  navToSpecificSeller = (seller) => {
    this.props.selectSellerAction(seller)
    this.props.navigation.navigate('SpecificSeller', {sellerName: seller.name});
  };

  render() {
    const {
      listSellers: { sellers, variables, fetchMore,  loading, },
      userId,
      specificSeller
    } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.id }
          data={sellers}
          renderItem={({ item }) => (
            <SearchSellerCard
              navToSpecificSeller={() => this.navToSpecificSeller(item)}
              item={item} />   )
            }
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
    return {
        userId: state.user.userId,
        specificSeller: state.seller.sellerInfo
    };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({selectSellerAction: selectSpecificSeller}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(compose(
  graphql(SELLERS_QUERY, {
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
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black",
  }
})
