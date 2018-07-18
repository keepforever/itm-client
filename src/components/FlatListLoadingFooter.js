import React from 'react';
import {Text, View, StyleSheet, ActivityIndicator } from 'react-native';

const FlatListLoadingFooter = ( props ) => {

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00"/>
    </View>
  );
};

export default FlatListLoadingFooter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
    display: 'flex',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
