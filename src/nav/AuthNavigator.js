import React from 'react';
//import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
//import TabBarIcon from '../components/TabBarIcon';

import Login from '../screens/Login'
import SignUp from '../screens/SignUp'

export default createStackNavigator({
  SignUp: SignUp,
  Login: Login
},{
  initialRouteName: 'Login'
});
