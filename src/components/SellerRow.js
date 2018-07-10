import React from 'react';
import {
  Image, Text, View, StyleSheet,
  Button, TouchableHighlight,
 } from 'react-native';

 import { clearLog } from '../utils'

const SellerRow = ( props ) => {
  const {
    item: {name, about, id, sells},
    viewThisSeller
  } = props

  return (
    <TouchableHighlight
      onPress={() => props.viewThisSeller({name, about, id, sells})}>
      <View style={styles.column}>
        <Text> NAME:  {name}  </Text>
        <Text> ABOUT: {about} </Text>
        <Text> SELLS ARRAY: </Text>
        {sells.map((product, index) => {
          return (
            <Text key={index}>{product}</Text>
          )
        })}
      </View>
    </TouchableHighlight>
  );
};

export default SellerRow;

const styles = StyleSheet.create({
  image: {
    height: 125,
    width: 125,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
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
    color: 'black'
  },
  text: {
    fontSize: 7,
    color: 'black'
  },
});
