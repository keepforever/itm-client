import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button,
  AsyncStorage
} from "react-native";
import { Text } from "react-native-elements";

class SettingsScreen extends Component {
  static navigationOptions = {
    title: "SettingsLayout",
  };

  state = {
    someThing: 'some state'
  }

  _logOutAsync = async () => {
    alert("You are being signed out, Bitch!")
    console.log( await AsyncStorage.getAllKeys())
    await AsyncStorage.clear()
    console.log( await AsyncStorage.getAllKeys())
    this.props.navigation.navigate('Auth');
  }

  render() {

    return (
      <View style={styles.container}>
        <Text h3>
          SettingsLayout
          <Button
            title="Loga' Dis' Muhfaka"
            onPress={this._logOutAsync}
          />
        </Text>
      </View>
    )
  }
}


export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    padding: 10
  }
})