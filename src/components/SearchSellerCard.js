import React from 'react';
import {View, StyleSheet } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import cardHeaderImage from '../../assets/images/sellerCardHeader.jpg';

export default  SearchSellerCard = (props) => {

  const { item: { name, about } } = props;

  return (
      <Card
        containerStyle={{
          backgroundColor: '#D3D3D3'
        }}
        title={name}
        image={cardHeaderImage}>
        <Text style={{marginBottom: 10}}>
          {about}
        </Text>
        <Button
          onPress={() => props.navToSpecificSeller()}
          icon={{name: 'fingerprint'}}
          backgroundColor='black'
          buttonStyle={{
            borderWidth: 1,
            borderColor: 'white',
          }}
          title='DETAILS' />
      </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  }
});
