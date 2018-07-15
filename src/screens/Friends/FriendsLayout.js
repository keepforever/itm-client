import React from 'react';
import {
  Image, View, Button,
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

import { ListItem, Text, Card } from 'react-native-elements';

class FriendsLayout extends React.Component {
  static navigationOptions = {
    title: "FriendsLayout",
  };
  state = {
    someThing: "some state"
  };
  navToOffer = () => {
   this.props.navigation.navigate('Offer');
  };

  render() {
    // Destructuring of the Lambs

    const {
      listUserFriends: {
        users,
        variables,
        loading,
      },
      userId, specificOffer
    } = this.props

    if(loading) {
      return <Text>Loading...</Text>
    }

    //clearLog('this.props.listUserFriends', this.props.listUserFriends)

    const currentUser = users[0]

    const { friends } = currentUser
    // friends.map((item, index) => {
    //   clearLog(`${item.name}`, item.about)
    // })

    clearLog('currentUser', currentUser)


    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.id }
          data={friends} //[{id: "1"}, {id: "2"}]
          renderItem={({ item }) => (
            <Card
              title={item.friend.name}>
              <Text style={{marginBottom: 10}}>
                {item.friend.about}
              </Text>
              <Text h3>Sells:</Text>
              {item.friend.sells.map((s, i) => {
                return <ListItem key={i} title={s} />
              })}
              <Button
                onPress={() => alert(item.friend.id)}
                icon={{name: 'fingerprint'}}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Compose Request' />
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
  }) (FriendsLayout));

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    padding: 10
  }
});
