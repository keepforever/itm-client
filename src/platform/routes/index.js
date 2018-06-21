import React from "react";
import { createBottomTabNavigator } from "react-navigation";
//import { Icon } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons'
//locals Drawer Navigation
import Home from "../../core/components/home";
import Settings from "../../core/components/settings"
//locals Temporary


export default createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Dash',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-home" size={24} />
      )
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-settings" size={24} />
      )
    }
  }
}, 
{
  initialRouteName: 'Dashboard', 
  navigationOptions: {
    tabBarVisible: true
  }
})