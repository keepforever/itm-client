import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';

import Home from '../screens/Home';
import PatronInbox from '../screens/PatronInbox';
import Links from '../screens/Links';
import SettingsScreen from '../screens/Settings';
import Friends from '../screens/Friends'
import Offer from '../screens/Offer'
import CreateOffer from '../screens/CreateOffer'
import SpecificOffer from '../screens/SpecificOffer'
import SpecificSeller from '../screens/SpecificSeller'
import BefriendSpecificSellerConfig from '../screens/BefriendSpecificSellerConfig'
import EditOffer from '../screens/EditOffer'
import ComposeRequest from '../screens/ComposeRequest'

import SearchSellers from '../screens/SearchSellers'

const HomeStack = createStackNavigator({
  PatronInbox: PatronInbox,
  Home: Home,
  ComposeRequest: ComposeRequest,
  Friends: Friends,
  Offer: Offer,
  CreateOffer: CreateOffer,
  SpecificOffer: SpecificOffer,
  EditOffer: EditOffer
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

const SearchSellersStack = createStackNavigator({
  SearchSellers: SearchSellers,
  SpecificSeller: SpecificSeller,
  BefriendConfig: BefriendSpecificSellerConfig,
});

SearchSellersStack.navigationOptions = {
  tabBarLabel: 'SearchSellers',
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
  SearchSellersStack,
  SettingsStack,
});
