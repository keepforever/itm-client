import React from 'react';
import { Text, View, Button, FlatList } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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

    const offersWithKey = offers.map(offer => ({
      ...offer,
      key: offer.id,
    }));

    console.log(offersWithKey[0]);

    return (
      <View>
        <Button
          title="Nav to CreateOffer"
          onPress={this.navToCreateOffer}
        />
        <Text style={{ marginTop: 50 }}>this is the offers page</Text>
        <FlatList
          data={offersWithKey}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
              <Text>{item.text}</Text>
            </View>
          )}
        />
      </View>
    );
  }
};

const offersQuery = gql`
  {
    offers {
      id
      text
      title
    }
  }
`;

export default graphql(offersQuery)(OffersLayout);
