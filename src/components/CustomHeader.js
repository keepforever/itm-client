import React from 'react';
import {Text, View, StyleSheet } from 'react-native';
import {  Header } from "react-native-elements";

const CustomHeader = ( props ) => {

  return (
      <Header
        outerContainerStyles={{width: '100%', height: 65}}
        centerComponent={{ text: props.titleText, style: { color: '#fff' } }}
      />
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  }
});
