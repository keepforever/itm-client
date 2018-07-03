import React from 'react';
import {
  Image, Text, View, StyleSheet,
  Button,
 } from 'react-native';

const OfferRow = ( props ) => {
  const {item: {title, text, id}, userId, offerAuthorId } = props
  //compare userId and item.id
  // console.log("userId: ", userId)
  // console.log("id:     ", id)
  let isOfferCreator = false;
  if(userId === offerAuthorId) {
    isOfferCreator = true
  }
  // console.log("isOfferCreator, ", isOfferCreator)
  let editDeleteButtons = null;
  if (isOfferCreator) {
    editDeleteButtons = (
      <View style={{flexDirection: 'row'}}>
        <Text>
          Work please
        </Text>
        <Button title="Balls" onPress={() => console.log(id)} />
        <Button title="Edit" onPress={() => props.edit(id)} />
        <Button title="Del" onPress={() => props.delete(id)} />
      </View>
    )
  }

  return (
    <View style={styles.row}>
      <Image
        style={styles.images}
        source={{ uri: `http://via.placeholder.com/250x250` }}
      />
      <View style={styles.right}>
        <Text style={styles.text}>{props.item.text}</Text>
        <Text style={styles.title}>{props.item.title}</Text>
        {isOfferCreator ? <Text style={styles.isCreator}>IS CREATOR</Text> : null}
        {editDeleteButtons}
      </View>
  </View>
  );
};

export default OfferRow;

const styles = StyleSheet.create({
  images: {
    height: 100,
    width: 100,
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
  isCreator: {
    color: 'red'
  }
});
