import React from "react";
import { Image, TouchableHighlight } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from "react-navigation";
import { Icon } from "react-native-elements";
//locals navigation
import Header from ".././ux/Header";
import Drawer from ".././ux/Drawer";
//locals Drawer Navigation
import Dashboard from "../../core/components/dashboard";
//locals Temporary


const headerRight = (
  <Image
    resizeMode="cover"
    style={{
      width: 36,
      height: 36,
      resizeMode: "contain",
      alignSelf: "center"
    }}
    source={{
      uri: "http://via.placeholder.com/50x50"
    }}
  />
);

const config = {
  Home: {
    screen: Dashboard
  },
  Dashboard: { screen: Dashboard },
};

const RootStack = StackNavigator(config, {
  initialRouteName: "Home",
  navigationOptions: ({ navigation }) => ({
    headerTitleStyle: { alignSelf: "center" },
    headerTitle: <Header />,

    headerStyle: {
      height: 50,
      backgroundColor: "white"
    },
    headerTintColor: "white",
    headerLeft: (
      <TouchableHighlight onPress={() => navigation.navigate("DrawerOpen")}>
        <Image
          resizeMode="cover"
          style={{
            width: 40,
            height: 40,
            resizeMode: "contain",
            alignSelf: "center"
          }}
          source={{
            uri: "http://via.placeholder.com/50x50"
          }}
        />
      </TouchableHighlight>
    ),
    headerRight: (
      <TouchableHighlight onPress={() => navigation.navigate("DrawerOpen")}>
        <Image
          resizeMode="cover"
          style={{
            width: 40,
            height: 40,
            resizeMode: "contain",
            alignSelf: "center"
          }}
          source={{
            uri: "http://via.placeholder.com/50x50"
          }}
        />
      </TouchableHighlight>
    )
  })
});

const rootscenesdrawer = {
  Root: {
    screen: RootStack
  }
};

export const RootStackDrawer = DrawerNavigator(rootscenesdrawer, {
  contentComponent: ({ navigation }) => (
    <Drawer navigation={navigation} routes={rootscenesdrawer} />
  )
});

const Router = RootStackDrawer;

export default Router;
