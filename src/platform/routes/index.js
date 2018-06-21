import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,

 } from "react-navigation";
//import { Icon } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons'
//locals Drawer Navigation
import Home from "../../core/components/home";
import Settings from "../../core/components/settings"
import SignUp from "../../core/components/signup"
//locals Temporary


export default createBottomTabNavigator({
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
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      tabBarLabel: 'SignUp',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name="ios-add"
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
  order: ['SignUp','Settings', 'Home'],
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
