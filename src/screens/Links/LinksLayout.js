import React, { Component } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableHighlight
} from "react-native";

import { Text } from "react-native-elements";

class LinksLayout extends Component {

  state = {
    someThing: 'some state'
  }

  render() {

    return (
      <View style={styles.container}>
        <Text h1>
          LinksLayout 1
        </Text>
      </View>
    )
  }
}


export default LinksLayout;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    padding: 10
  }
})
