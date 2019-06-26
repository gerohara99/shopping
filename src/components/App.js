/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import  React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers/ShoppingReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools'
import firebase from 'firebase'

import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation'

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import SignOutScreen from '../Screens/SignOutScreen'
import SignInScreen from '../Screens/SignInScreen'
import ShopList from '../Screens/ShopList'
import ShoppingItemList from '../Screens/ShoppingItemList'
import AddShoppingItem from '../Screens/AddShoppingItem'

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
)

const store = createStore(reducers, enhancer);

const Tabs = createBottomTabNavigator(
  {
    ShopList: {
      screen: ShopList,
      navigationOptions: {
        tabBarLabel: "Shopping",
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="shoppingcart" size={30} color={tintColor} />
        )
      }
    },
    ShoppingItemList: {
      screen: ShoppingItemList,
      navigationOptions: {
        tabBarLabel: "Edit/Delete",
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="edit" size={30} color={tintColor} />
        )
      }
    },
    AddShoppingItem: {
      screen: AddShoppingItem,
      navigationOptions: {
        tabBarLabel: "Add",
        tabBarIcon: ({ tintColor }) => (
          <Entypo name="add-to-list" size={30} color={tintColor} />
        )
      }
    },
    SignOutScreen: {
      screen: SignOutScreen,
      navigationOptions: {
        tabBarLabel: "SignOut",
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons name="logout" size={30} color={tintColor} />
        )
      }
    }
  }
)

const AppNavigator = createStackNavigator({
  SignInScreen: { screen: SignInScreen },
  HomeScreen: { screen: Tabs }
})

const AppContainer = createAppContainer(AppNavigator)

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

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}