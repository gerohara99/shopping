/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
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

var signedInIndicator = true

//var signedInIndicator = isSignedIn()
//    if (signedInIndicator) {
//      this.props.setSignedIn({ signedIn: true, checkedSignIn: true })
//    } else {
//      this.props.setSignedIn({ signedIn: false, checkedSignIn: true })
//    }
//  }

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
  { initialRouteName: signedInIndicator ? "Dashboard" : "Welcome" }
)

export default calss AppContainer = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
