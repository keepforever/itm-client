import React, { Component } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { Text } from "react-native-elements";

class SettingsLayout extends Component {

  state = {
    someThing: 'some state'
  }

  render() {

    return (
      <View style={styles.container}>
        <Text h1>
          SettingsLayout
        </Text>
      </View>
    )
  }
}


export default SettingsLayout;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 10
  }
})
