import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
// HomeStack screens
import PatronInbox from '../screens/main/homeStack/PatronInbox';
import SpecificOffer from '../screens/main/homeStack/SpecificOffer';
// FriendsStack screens
import ComposeRequest from '../screens/main/friendsStack/ComposeRequest'
import Friends from '../screens/main/friendsStack/Friends'
// SearchSellesrStack screens
import SearchSellers from '../screens/main/searchSellersStack/SearchSellers'
import SpecificSeller from '../screens/main/searchSellersStack/SpecificSeller'
import BefriendSpecificSellerConfig from '../screens/main/searchSellersStack/BefriendSpecificSellerConfig'
// SettingsStack screens
import SettingsScreen from '../screens/main/settingsStack/Settings';


const HomeStack = createStackNavigator({
  PatronInbox: PatronInbox,
  SpecificOffer: SpecificOffer,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const FriendsStack = createStackNavigator({
  Friends: Friends,
  ComposeRequest: ComposeRequest,
});

FriendsStack.navigationOptions = {
  tabBarLabel: 'Friends',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-remove-circle${focused ? '' : '-outline'}`
          : 'md-remove-circle'
      }
    />
  ),
};

const SearchSellersStack = createStackNavigator({
  SearchSellers: SearchSellers,
  SpecificSeller: SpecificSeller,
  BefriendConfig: BefriendSpecificSellerConfig,
});

SearchSellersStack.navigationOptions = {
  tabBarLabel: 'Sellers',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-search${focused ? '' : '-outline'}` : 'md-search'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  FriendsStack,
  SearchSellersStack,
  SettingsStack,
},{
tabBarOptions: {
  style: {
    backgroundColor: 'black',
  }
}});
