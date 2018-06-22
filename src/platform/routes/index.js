import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
 } from "react-navigation";
//import { Icon } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons'
//locals Drawer Navigation
import Home from "../../core/components/home";
import Settings from "../../core/components/settings"
import SignUp from "../../core/components/signup"
import LogIn from "../../core/components/login"
//locals Temporary

const AppStack = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Dash',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name="ios-home"
          color={tintColor}
          size={24}
        />
      )
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name="ios-settings"
          color={tintColor}
          size={24}
        />
      )
    }
  }
},
{//router config
  initialRouteName: 'Home',
  order: ['Home','Settings'],
  //nav options that apply to complete tab navigator
  navigationOptions: {
    tabBarVisible: true
  },
  tabBarOptions:{
    //activeTintColor supplies "tintColor" var above
    activeTintColor:'red',
    inactiveTintColor: 'black'
  }
})

const AuthStack = createStackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: ( { navigation } ) => ({
      title: 'SignUp',
      headerBackTitle: null
    })
  },
  LogIn: {
    screen: LogIn,
    navigationOptions: ( { navigation } ) => ({
      title: 'LogIn',
      headerBackTitle: null
    })
  }
},{
  initialRouteName: 'LogIn',
});

export default createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth'
  }
);

//
// export default createBottomTabNavigator({
//   Home: {
//     screen: Home,
//     navigationOptions: {
//       tabBarLabel: 'Dash',
//       tabBarIcon: ({tintColor}) => (
//         <Icon
//           name="ios-home"
//           color={tintColor}
//           size={24}
//         />
//       )
//     }
//   },
//   SignUp: {
//     screen: SignUp,
//     navigationOptions: {
//       tabBarLabel: 'SignUp',
//       tabBarIcon: ({tintColor}) => (
//         <Icon
//           name="ios-add"
//           color={tintColor}
//           size={24}
//         />
//       )
//     }
//   },
//   Settings: {
//     screen: Settings,
//     navigationOptions: {
//       tabBarLabel: 'Settings',
//       tabBarIcon: ({tintColor}) => (
//         <Icon
//           name="ios-settings"
//           color={tintColor}
//           size={24}
//         />
//       )
//     }
//   }
// },
// {//router config
//   initialRouteName: 'Home',
//   order: ['SignUp','Settings', 'Home'],
//   //nav options that apply to complete tab navigator
//   navigationOptions: {
//     tabBarVisible: true
//   },
//   tabBarOptions:{
//     //activeTintColor supplies "tintColor" var above
//     activeTintColor:'red',
//     inactiveTintColor: 'black'
//   }
// })
