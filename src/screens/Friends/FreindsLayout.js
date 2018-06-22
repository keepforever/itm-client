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

class FriendsLayout extends Component {
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
   this.props.navigation.navigate('Login');
 };
}

export default FriendsLayout;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    padding: 10
  }
});
