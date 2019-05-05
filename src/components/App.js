/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AsyncStorage,View,Text,StyleSheet,Button} from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers/ShoppingReducer'
import thunk from 'redux-thunk'
import firebase from 'firebase'
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { isSignedIn } from "./Auth"
import * as actions from '../actions'
import Loader from '../Screens/Loader'
import SignIn from "../Screens/SignIn"
import SignOut from "../Screens/SignOut"
import ShopList from "../Screens/ShopList"
import ShoppingItemList from "../Screens/ShoppingItemList"
import AddShoppingItem from "../Screens/AddShoppingItem"

const store = createStore(
  reducers,
  applyMiddleware(thunk),
)

var signedInIndicator = ""

type props = {
  setSignedIn: function,
}

type state = {}

export default class App extends Component<props, state> {

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

  componentDidMount() {
    isSignedIn()
      .then(res => (
          this.props.setSignedIn({ signedIn: res, checkedSignIn: true }),
          signedInIndicator = res
        ))
      .catch(err => alert("An error occurred"));
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

class WelcomeScreen extends Component<props, state> {
  render() { return <SignIn />}
}

class DashboardScreen extends Component<props, state> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>DashboardScreen</Text>
      </View>
    );
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
  { initialRouteName: signedInIndicator ? "Dashboard" : "Welcome" }
)

const AppContainer = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
