import React from 'react';
import {
  Image, View, StyleSheet,
  Button, TouchableHighlight,
 } from 'react-native';
import {Text} from 'react-native-elements';
import { clearLog } from '../utils'

const InboxPreviewRow = ( props ) => {
  const {
    item: {title, text, id, author: { name }},
    userId, viewThisOffer
  } = props

  const authorName = name

  // clearLog('OFFER_ROW id', id)
  // clearLog('OFFER_ROW userId', userId)
  navToSpecificOffer = (offer) => {
    //console.log("offer in navToSpecificOffer: ", offer)
    this.props.selectOfferAction(offer)
    this.props.navigation.navigate('SpecificOffer');
  };

  // clearLog('hellow from InboxPreviewRow', props)
  // clearLog('authorName', authorName)

  return (
    <TouchableHighlight onPress={() => props.viewThisOffer({text, title, id})}>
      <View style={styles.container}>
          <Text h3 style={styles.from}>From: {authorName}</Text>
          <Text h3 style={styles.title}> {title}</Text>
          <Text h3 style={styles.text}> {text}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default InboxPreviewRow;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    justifyContent:'space-around',
    flexDirection: 'column',
    margin: 10,
    height:100,
    width: '100%',
    borderBottomColor: 'blue',
    borderBottomWidth: 0.5
  },
  from: {
    fontSize: 25,
  },
  title: {
    fontSize: 15,
  },
  text: {
    fontSize: 10,
  },
  image: {
    height: 125,
    width: 125,
  },
});
