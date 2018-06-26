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
  static navigationOptions = {
    title: "FriendsLayout",
  };
  state = {
    someThing: "some state"
  };
  navToOffer = () => {
   this.props.navigation.navigate('Offer');
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Nav to Offer"
          onPress={this.navToOffer} />
      </View>
    );
  }
}

export default FriendsLayout

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    padding: 10
  }
});
