import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator'
import AuthLoadingScreen from './AuthLoadingScreen'

// Read more at https://reactnavigation.org/docs/en/auth-flow.html

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Main: MainTabNavigator,
  Auth: AuthNavigator
});
