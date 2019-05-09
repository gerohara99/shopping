/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers/ShoppingReducer'
import thunk from 'redux-thunk'
import firebase from 'firebase'
import { AsyncStorage } from "AsyncStorage"

import { View, Text, StyleSheet } from 'react-native'
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SignIn from '../Screens/SignIn'
import ShopList from '../Screens/ShopList'
import ShoppingItemList from '../Screens/ShoppingItemList'
import AddShoppingItem from '../Screens/AddShoppingItem'

export const USER_KEY = "user-shopping-key"

var isSignedIn = null

const store = createStore(
  reducers,
  applyMiddleware(thunk),
)
export default class App extends Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyArUsFOCEjBgtgpyvgAEwBcYIr_IhFEIV8",
      authDomain: "shopping-44bca.firebaseapp.com",
      databaseURL: "https://shopping-44bca.firebaseio.com",
      projectId: "shopping-44bca",
      storageBucket: "shopping-44bca.appspot.com",
      messagingSenderId: "783286480391"
    })
  }

  componentDidlMount() {
    isSignedIn = async () => {
      try {
        const value = await AsyncStorage.getItem(USER_KEY)
        if (value !== null) {
          console.log('User already logged in', value)
        }
      } catch (error) {
        console.log('User not logged in', error)
      }
    }
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

class WelcomeScreen extends Component {
  render() { return <SignIn /> }
}

class DashboardScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>DashboardScreen</Text>
      </View>
    )
  }
}

const DashboardTabNavigator = createBottomTabNavigator(
  {
    ShopList,
    ShoppingItemList,
    AddShoppingItem
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  }
);
const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <MaterialIcon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
)

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
})

const AppSwitchNavigator = createSwitchNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    Dashboard: { screen: AppDrawerNavigator }
  },
  { initialRouteName: isSignedIn ? "Welcome" : "Dashboard" }
)

const AppContainer = createAppContainer(AppSwitchNavigator)
