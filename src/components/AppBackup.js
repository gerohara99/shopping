/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import  React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers/ShoppingReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools'
import firebase from 'firebase'

import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SignOut from '../Screens/SignOut'
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

const DashboardTabNavigator = createBottomTabNavigator(
  {
    ShopList: {
      screen: ShopList,
      navigationOptions: {
        tabBarLabel: "ShopList",
        tabBarIcon: ({ tintColor }) => (
          <Entypo name="shop" size={30} color={tintColor} />
        )
      }
    },
    ShoppingItemList: {
      screen: ShoppingItemList,
      navigationOptions: {
        tabBarLabel: "ShoppingItemList",
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="shoppingcart" size={30} color={tintColor} />
        )
      }
    },
    AddShoppingItem: {
      screen: AddShoppingItem,
      navigationOptions: {
        tabBarLabel: "AddShoppingItem",
        tabBarIcon: ({ tintColor }) => (
          <Entypo name="add-to-list" size={30} color={tintColor} />
        )
      }
    },
    SignOut: {
      screen: SignOut,
      navigationOptions: {
        tabBarLabel: "SignOut",
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons name="logout" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  }
)
const RootStack = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      }
    }
  }
)

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: RootStack
  }
})

const AppSwitchNavigator = createSwitchNavigator(
  {
    SignIn: { screen: SignInScreen },
    Dashboard: { screen: AppDrawerNavigator }
  },
    { initialRouteName: "SignIn"
  }
)

export const AppContainer = createAppContainer(AppSwitchNavigator)

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