import React from 'react';
import { Image, Text, View, Button, FlatList, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { OFFERS_QUERY } from '../../graphql/queries/OFFERS_QUERY';
import OfferRow from '../../components/OfferRow'

class OffersLayout extends React.Component {
  static navigationOptions = {
    title: "OfferLayout",
  };

  navToCreateOffer = () => {
   this.props.navigation.navigate('CreateOffer');
  };

  render() {
    const { data: { offers }, loading, history } = this.props
    //console.log('OFFERLAYOUT props: ', this.props)

    if (loading || !offers) {
      return null;
    }

    console.log('OFFER_LAYOUT, offers[0]:', offers[0]);

    return (
      <View>
        <Button
          title="Nav to CreateOffer"
          onPress={this.navToCreateOffer}
        />
        <Text style={{ marginTop: 10, fontSize: 20 }}>Offers:</Text>
        <FlatList
          keyExtractor={item => item.id}
          data={offers}
          renderItem={({ item }) => (
            <OfferRow item={item} />

          )}
        />
      </View>
    );
  }
};

export default graphql(OFFERS_QUERY)(OffersLayout);



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
