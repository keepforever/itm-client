import React from 'react';
import {
  Image, View,
  FlatList, StyleSheet, ActivityIndicator
} from 'react-native';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { FRIENDS_OF_USER_QUERY } from '../../graphql/queries/FRIENDS_OF_USER_QUERY';
import OfferRow from '../../components/OfferRow'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { selectSpecificSeller } from '../../store/actions/seller';
import { clearLog } from '../../utils';
import TextField from '../../components/TextField';
import CustomHeader from '../../components/CustomHeader'

import { ListItem, Text, Card, Button } from 'react-native-elements';

class FriendsLayout extends React.Component {
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
    someThing: "some state"
  };

  navToComposeRequest = (seller) => {
    //clearLog('navToComposeRequest', seller)
    this.props.selectSellerAction(seller)
    this.props.navigation.navigate('ComposeRequest', {sellerName: seller.name});
  };

  render() {
    // Destructuring of the Lambs

    const {
      listUserFriends: {
        users,
        variables,
        loading,
      },
      userId, specificSeller
    } = this.props

    if(loading) {
      return <ActivityIndicator size="large" color="#00ff00"/>
    }

    //clearLog('this.props.listUserFriends', this.props.listUserFriends)

    const currentUser = users[0]

    const { friends } = currentUser
    // friends.map((item, index) => {
    //   clearLog(`${item.name}`, item.about)
    // })

    //clearLog('currentUser.friends', currentUser.friends)


    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.id }
          data={friends} //[{id: "1"}, {id: "2"}]
          renderItem={({ item }) => (
            <Card
              titleStyle={{ padding: 5, backgroundColor:'black', color: 'white', fontSize: 20}}
              containerStyle={{
                backgroundColor: '#D3D3D3'
              }}
              title={item.friend.name}>
              {/* <Text style={{marginBottom: 10}}>
                {item.friend.about}
              </Text> */}
              <Text h3>Sells:</Text>
              <View style={styles.sellsWrap}>
                {item.friend.sells.map((s, i) => {
                  return i === (item.friend.sells.length - 1) ? <Text key={i}>{s}.</Text> : <Text key={i}>{s}, </Text>
                  {/* <ListItem hideChevron={true} key={i} title={s} /> */}
                })}
              </View>
              <Button
                onPress={() => this.navToComposeRequest(item.friend)}
                icon={{name: 'email'}}
                backgroundColor='black'
                buttonStyle={{
                  borderRadius: 0,
                  borderWidth: 1,
                  borderColor: 'white',
                  marginTop: 20,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0
                }}
                title='Write Seller' />
            </Card>
          )}
        />
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({selectSellerAction: selectSpecificSeller}, dispatch)
}

// FRIENDS_OF_USER_QUERY can also be used to get all user Info
export default connect(mapStateToProps, mapDispatchToProps)(
  graphql(FRIENDS_OF_USER_QUERY, {
    options: (props) => ({ variables: { id: props.userId } }),
    name: "listUserFriends"
  })(FriendsLayout));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
    padding: 1
  },
  sellsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
