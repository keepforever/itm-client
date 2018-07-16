import React, { Component } from "react";
import {
  View, ScrollView, KeyboardAvoidingView, StyleSheet,
  Button, TouchableHighlight, FlatList, ActivityIndicator,
  Dimensions, SafeAreaView,
} from "react-native";
import { graphql, compose } from 'react-apollo';
import { OFFERS_QUERY } from '../../graphql/queries/OFFERS_QUERY';
import { Text, Header } from "react-native-elements";
import { clearLog } from '../../utils';
import InboxPreviewRow from '../../components/InboxPreviewRow'
import CustomHeader from '../../components/CustomHeader'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { selectSpecificOffer } from '../../store/actions/offer';

const flatListHeight = Dimensions.get('window').height*0.6;

class PatronInboxLayout extends Component {
  static navigationOptions = {header: null};
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     headerTitle: <CustomHeader titleText={navigation.state.routeName} />,
  //     headerStyle: {
  //       backgroundColor: '#fff',
  //     },
  //   };
  // };
  //
  state = {
    offers: []
  };

  showMoreApp = () => {
   this.props.navigation.navigate('Friends');
  };

  navToSpecificOffer = (offer) => {
    //console.log("offer in navToSpecificOffer: ", offer)
    this.props.selectOfferAction(offer)
    this.props.navigation.navigate('SpecificOffer');
  };

  render() {
    const {
      listOffers: {
        offersConnection = {pageInfo: {}, edges: []},
        refetch,
        variables,
        fetchMore,
        loading,
      },
    } = this.props

    //clearLog('offersConnection, ', offersConnection)
    //clearLog('WindowHeight', flatListHeight)

    let offersMap = {}; // to help address keys error in lue of adding random number
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader titleText={this.props.navigation.state.routeName} />
        <View style={styles.flatListContainer}>
          <FlatList
            keyExtractor={item => item.id }
            data={offersConnection.edges
              .map(x => ({
                ...x.node,
                //showButtons: userId === x.node.author.id,
              }))
            .filter((x) => {
              if(offersMap[x.id]) {
                return false
              }
              offersMap[x.id] = 1
              return true
            })}
            renderItem={({ item }) => (
              <InboxPreviewRow
                item={item}
                viewThisOffer={this.navToSpecificOffer}
              />
            )}
            onEndReached={() => {
              if (!loading && offersConnection.pageInfo.hasNextPage) {
                fetchMore({
                  variables: {
                    after: offersConnection.pageInfo.endCursor,
                  },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    //clearLog('previousResult', previousResult)
                    //clearLog('fetchMoreResult', fetchMoreResult)
                    if (!fetchMoreResult) {
                      return previousResult;
                    }
                    if (
                      !previousResult ||
                      !previousResult.offersConnection ||
                      !previousResult.offersConnection.edges
                    ) {
                      return fetchMoreResult
                    }
                    return {
                      offersConnection: {
                        __typename: 'OfferConnection',
                        pageInfo: fetchMoreResult.offersConnection.pageInfo,
                        edges: [
                          ...previousResult.offersConnection.edges,
                          ...fetchMoreResult.offersConnection.edges,
                        ],
                      },
                    };
                  },
                });
              }
            }}
            onEndReachedThreshold={0}
            ListFooterComponent={() => (
              offersConnection.pageInfo.hasNextPage ? <ActivityIndicator size="large" color="#00ff00"/> : null)}
          />
        </View>
        <View style={styles.container}>
          <Button
            title="Nav to Friends"
            onPress={this.showMoreApp} />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
    return {
        userId: state.user.userId,
        specificOffer: state.offer.specificOffer
    };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({selectOfferAction: selectSpecificOffer}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(graphql(OFFERS_QUERY, {
  options: {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: 'createdAt_ASC'
    }
  },
  name: "listOffers"
})(PatronInboxLayout))


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  flatListContainer: {
    marginRight: 5,
    marginLeft: 5,
    height: flatListHeight
  }
});
