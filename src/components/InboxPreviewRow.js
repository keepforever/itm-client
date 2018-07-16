import React from 'react';
import {
  Image, View, StyleSheet, Button, TouchableHighlight,
  ImageBackground
} from 'react-native';
import {Text, Tile} from 'react-native-elements';
import { clearLog } from '../utils'
import tileBackgroundImage from '../../assets/images/offerListItemTileImage.jpg'
// <Tile
//   imageSrc={tileBackgroundImage}
//   title={`${title}`}
//   featured
//   containerStyle={{height: 100}}
//   caption={`${authorName}`}
// />
//
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
      <ImageBackground
        source={tileBackgroundImage}
        style={{width: '100%', height: 125}}
      >
        <View style={styles.container}>
            <Text h4 style={styles.from}> {authorName}</Text>
            <Text h4 style={styles.title}> {title}</Text>
            <Text h4 style={styles.text}> {text}</Text>
        </View>
      </ImageBackground>
    </TouchableHighlight>
  );
};

export default InboxPreviewRow;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'rgba(52, 52, 52, 0.05)',
    justifyContent:'space-around',
    flexDirection: 'column',
    height: 125,
    width: '100%',
  },
  from: {
    fontSize: 19,
  },
  title: {
    fontSize: 15,
  },
  text: {
    fontSize: 10,
  },
});
