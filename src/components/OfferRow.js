import React from 'react';
import {Image, Text, View, StyleSheet } from 'react-native';

const OfferRow = ( props ) => {

  return (
    <View style={styles.row}>
      <Image
        style={styles.images}
        source={{ uri: `http://via.placeholder.com/250x250` }}
      />
      <View style={styles.right}>
        <Text style={styles.text}>{props.item.text}</Text>
        <Text style={styles.title}>{props.item.title}</Text>
      </View>
  </View>
  );
};

export default OfferRow;

const styles = StyleSheet.create({
  images: {
    height: 60,
    width: 60,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  },
  right: {
    marginLeft: 10,
    marginRight: 30,
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 10,
  },
  text: {
    fontSize: 7,
  },
});
