import React, { Component } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  TouchableHighlight
} from "react-native";

import { Text } from "react-native-elements";

class HomeLayout extends Component {
  static navigationOptions = {
    title: "HomeLayout",
  };
  state = {
    someThing: "some state"
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Button
            title="Show me more of the app"
            onPress={this._showMoreApp} />
        </View>
      </View>
    );
  }
  _showMoreApp = () => {
   this.props.navigation.navigate('Friends');
 };
}

export default HomeLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    backgroundColor: "white",
    padding: 10
  }
});
