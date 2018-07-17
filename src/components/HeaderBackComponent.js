import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import {  Header, Icon } from "react-native-elements";
import { clearLog } from '../utils';

const CustomBackComponent = ( props ) => {

  return (
    <TouchableHighlight
      onPress={() => props.monkey.goBack()}>
      <Icon
        name='reply'
        color='white'
      />
    </TouchableHighlight>
  );
};

export default CustomBackComponent;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  }
});
