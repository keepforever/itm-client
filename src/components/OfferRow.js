import React from 'react';
import {
  Image, Text, View, StyleSheet,
  Button, TouchableHighlight,
 } from 'react-native';

const OfferRow = ( props ) => {
  const {item: {title, text, id}, userId, offerAuthorId, showButtons, viewThisOffer } = props

  let editDeleteButtons = null;
  if (showButtons) {
    editDeleteButtons = (
      <View style={{flexDirection: 'row'}}>
        <Button title="Edit" onPress={() => props.edit(id)} />
        <Button title="Del" onPress={() => props.delete(id)} />
      </View>
    )
  }

  return (
    <TouchableHighlight onPress={() => props.viewThisOffer({text, title, id})}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{ uri: `http://via.placeholder.com/250x250` }}
        />
        <View style={styles.right}>
          <Text style={styles.text}>TI: {text}</Text>
          <Text style={styles.title}>TX: {title}</Text>
          {editDeleteButtons}
        </View>
      </View>
    </TouchableHighlight>

  );
};

export default OfferRow;

const styles = StyleSheet.create({
  image: {
    height: 125,
    width: 125,
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
