import React, { Component } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableHighlight
} from "react-native";

import { Text } from "react-native-elements";

class HomeLayout extends Component {

  state = {
    someThing: 'some state'
  }

  render() {

    return (
      <View style={styles.container}>
        <Text h1>
          H1 Text!!
        </Text>
      </View>
    )
  }
}


export default HomeLayout;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 10
  }
})
