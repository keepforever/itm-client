import React from 'react';
import {
  Image, View, StyleSheet, Button, TouchableHighlight,
  ImageBackground
} from 'react-native';
import {Text, Icon} from 'react-native-elements';
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
    <TouchableHighlight onPress={() => props.viewThisOffer({text, title, id, name})}>
      <View style={styles.rowContainer}>
        <View style={styles.icon}>
          <Icon
            size={50}
            name='ios-eye-outline'
            type='ionicon'
            color='black'
          />
        </View>
        <View style={styles.container}>
            <Text h4 style={styles.from}> {authorName}</Text>
            <Text h4 style={styles.title}> {title}</Text>
            <Text h4 style={styles.text}> {text}</Text>
        </View>

      </View>

    </TouchableHighlight>
  );
};

export default InboxPreviewRow;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    borderColor: 'black',
    borderWidth: 1,
    borderBottomColor: 'black',
    borderLeftColor: '#D3D3D3',
    borderTopColor: 'black',
    borderRightColor: 'black',
    display: 'flex',
    justifyContent:'space-around',
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 125,
  },
  icon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D3D3D3',
    borderWidth: 1,
    borderBottomColor: 'black',
    borderLeftColor: 'black',
    borderTopColor: 'black',
    borderRightColor: '#D3D3D3'
  },
  from: {
    flex: 1,
    fontSize: 19,
    backgroundColor: '#D3D3D3',
  },
  title: {
    flex: 1,
    fontSize: 15,
    backgroundColor: '#D3D3D3',
  },
  text: {
    flex: 1,
    fontSize: 15,
    backgroundColor: '#D3D3D3',
  },
});
