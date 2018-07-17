import React from 'react';
import {Text, View, StyleSheet } from 'react-native';
import {  Header } from "react-native-elements";
import HeaderBackComponent from './HeaderBackComponent'

const CustomHeaderBack = ( props ) => {
  const { monkey } = props

  return (
    <Header
      leftComponent={<HeaderBackComponent monkey={monkey} />}
      outerContainerStyles={{width: '100%', height: 65}}
      centerComponent={{ text: props.titleText, style: { color: '#fff' } }}
    />
  );
};

export default CustomHeaderBack;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  }
});
