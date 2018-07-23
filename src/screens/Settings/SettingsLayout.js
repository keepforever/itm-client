import React, { Component } from "react";
import {
  View, StyleSheet, AsyncStorage,
} from "react-native";
import { Text, Button } from "react-native-elements";
import { clearLog } from '../../utils';

class SettingsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {routeName} = navigation.state
    return {
      title: `${routeName}`,
      headerStyle: {
        backgroundColor: 'black',
        height: 50,
        width: '100%'
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 16
      }
    };
  };

  state = {
    someThing: 'some state'
  }

  _logOutAsync = async () => {
    alert("You have been signed out. Login again to resume.")
    //console.log( await AsyncStorage.getAllKeys())
    await AsyncStorage.clear()
    clearLog('LOG_OUT_ASYNC CALLED', await AsyncStorage.getAllKeys())
    this.props.navigation.navigate('Auth');
  }

  render() {

    return (
      <View style={styles.container}>
        <Button
          onPress={() => this._logOutAsync()}
          icon={{name: 'fingerprint'}}
          backgroundColor='black'
          buttonStyle={{
            width: 250,
            borderRadius: 0,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 20,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title='Log Out' />
      </View>
    )
  }
}


export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: "black",
  }
})
