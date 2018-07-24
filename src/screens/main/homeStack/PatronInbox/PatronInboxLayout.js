import React, { Component } from "react";
import {
  View, ScrollView, KeyboardAvoidingView, StyleSheet,
  Button, TouchableHighlight, FlatList, ActivityIndicator,
  Dimensions, SafeAreaView, AsyncStorage, Tile
} from "react-native";
import { graphql, compose } from 'react-apollo';
import { OFFERS_QUERY } from '../../../../graphql/queries/OFFERS_QUERY';
import { Text, Header, Avatar } from "react-native-elements";
import { clearLog } from '../../../../utils';
import InboxPreviewRow from '../../../../components/InboxPreviewRow'
import CustomHeader from '../../../../components/CustomHeader'
import FlatListLoadingFooter from '../../../../components/FlatListLoadingFooter'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { selectSpecificOffer } from '../../../../store/actions/offer';
import monkeyAvatar from  '../../../../../assets/images/monkey.jpg';

const flatListHeight = Dimensions.get('window').height*0.6;

let userName, userAbout, userInboxCount, userFriendCount;

const asyncGetUserInfo = async () => {
  userName = await AsyncStorage.getItem('userName');
  userAbout = await AsyncStorage.getItem('userAbout');
  userInboxCount = await AsyncStorage.getItem('userInboxCount');
  userFriendCount = await AsyncStorage.getItem('userFriendCount');
  //clearLog('thishappened', 'thishappened')
}

class PatronInboxLayout extends Component {
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

  state = {
    offers: []
  };

  showMoreApp = () => {
   this.props.navigation.navigate('Friends');
  };

  navToSpecificOffer = (offer) => {
    //clearLog("offer in navToSpecificOffer: ", offer.name)
    this.props.selectOfferAction(offer)
    this.props.navigation.navigate('SpecificOffer', {offerTitle: offer.title});
  };

  render() {
    asyncGetUserInfo()
    //clearLog('NAVIGATION PROPS', this.props.navigation)
    const {
      listOffers: {
        offersConnection = {pageInfo: {}, edges: []},
        refetch,
        variables,
        fetchMore,
        loading,
      },
      user
    } = this.props

    user.userName = userName
    user.userAbout = userAbout
    user.inboxCount = userInboxCount
    user.friendCount = userFriendCount

    //clearLog('USER', user)
    //clearLog('offersConnection, ', offersConnection)
    //clearLog('WindowHeight', flatListHeight)
    if(!user.userName || !user.userAbout) {
      return <Text>Loading</Text>
    }

    let offersMap = {}; // to help address keys error in lue of adding random number
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfo}>
          <Text style={styles.whiteText} h3>{user.userName}'s Inbox</Text>
          <Text style={styles.whiteText}>About: {user.userAbout}</Text>
          <Text style={styles.whiteText}>Offer Count: {user.inboxCount}</Text>
          <Text style={styles.whiteText}>Friend Count: {user.friendCount}</Text>
        </View>
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
              offersConnection.pageInfo.hasNextPage ? <FlatListLoadingFooter /> : null)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        userId: state.user.userId,
        specificOffer: state.offer.specificOffer
    };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({selectOfferAction: selectSpecificOffer}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(graphql(OFFERS_QUERY, {
  options: (props) => ({
    variables: {
      id: props.userId,
      orderBy: 'createdAt_ASC'
    },
    fetchPolicy: "cache-and-network",
  }),
  name: "listOffers"
})(PatronInboxLayout))


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: "black",
  },
  flatListContainer: {
    height: flatListHeight
  },
  userInfo: {
    backgroundColor: 'black',
    justifyContent: 'space-around',
  },
  profileInfo: {
    backgroundColor:'yellow',
    justifyContent: 'space-between',
  },
  whiteText: {
    color: 'white'
  }
});
