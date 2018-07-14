import React from 'react';
import { Image, ScrollView, View, FlatList, StyleSheet } from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { OFFERS_QUERY } from '../../graphql/queries/OFFERS_QUERY';
import { DELETE_OFFER } from '../../graphql/mutations/DELETE_OFFER';
import { EDIT_OFFER } from '../../graphql/mutations/EDIT_OFFER';
import OfferRow from '../../components/OfferRow';
import { connect } from 'react-redux';
import { clearLog } from '../../utils';
import { Card, Text, ListItem, Button} from 'react-native-elements'
import cardHeaderImage from './sellerCardHeader.jpg'

class SpecificSeller extends React.Component {
  static navigationOptions = ({ navigation }) => {
    //clearLog('NAVIGATION', navigation)
    return {
      headerTitle: <CustomHeader titleText={navigation.state.routeName} />,
      headerStyle: {
        backgroundColor: '#fff',
      },
    };
  };

  addSellerToFriends = () => {
    const seller = this.props.specificSeller
    clearLog('addSellerToFriends', seller )
  };


  render() {
    const { specificSeller: { name, about, sells } } = this.props
    // clearLog('SPECIFIC_SELLER_LAYOUT, props', this.props)
    clearLog('SPECIFIC_SELLER_LAYOUT, about', about)
    return (
      <ScrollView style={styles.container} >
        <Card
          title={name}
          image={cardHeaderImage}>
          <Text h4>About:</Text>
          <Text style={{marginBottom: 10}}>
            {about}
          </Text>
          <Text h4>Sells:</Text>
          {sells.map((s, i) => {
            return <ListItem key={i} title={s} />
          })}
          <Button
            onPress={() => this.addSellerToFriends()}
            icon={{name: 'code'}}
            backgroundColor='#03A9F4'
            buttonStyle={{
              borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0
            }}
            title='Add Seller' />
        </Card>
      </ScrollView>
    );
  }
};

const mapStateToProps = state => {
    return {
        userId: state.user.userId,
        specificSeller: state.seller.sellerInfo
    };
}

export default connect(mapStateToProps)(graphql(EDIT_OFFER)(SpecificSeller))

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
