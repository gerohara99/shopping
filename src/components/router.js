import React from "react";
import { Platform, StatusBar } from "react-native";
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import SignIn from "../Screens/SignIn"
import SignOut from "../Screens/SignOut"
import ShopList from "../Screens/ShopList"
import ShoppingItemList from "../Screens/ShoppingItemList"
import AddShoppingItem from "../Screens/AddShoppingItem"

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createStackNavigator({
  SignUp: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In",
      headerStyle
    }
  },
})

export const SignedIn = createBottomTabNavigator(
  {
    ShoppingItemList: {
      screen: ShoppingItemList,
      navigationOptions: {
        tabBarLabel: "Shopping",
        tabBarIcon: ({ tintColor }) => (
          <AntDeisgnIcon name={'shoppingcart'} size={50}/>
        )
      }
    },
    ShopList: {
      screen: ShopList,
      navigationOptions: {
        tabBarLabel: "Shops",
        tabBarIcon: ({ tintColor }) => (
          <EntypoIcon name={'shop'} size={50} style={styles.icon} />
        )
      }
    },
    AddShoppingItem: {
      screen: AddShoppingItem,
      navigationOptions: {
        tabBarLabel: "Add Shopping",
        tabBarIcon: ({ tintColor }) => (
        <EntypoIcon name={'add-to-list'} size={60} style={styles.icon} />
        )
      }
    },
    SignOut: {
      screen: SignOut,
      navigationOptions: {
        tabBarLabel: "SignOut",
        tabBarIcon: ({ tintColor }) => (
        <AntDesignIcon name={'logout'} size={40} style={styles.icon} />
      )
    }
  },
  tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
    }
  }
)

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignIn
      },
      SignedOut: {
        screen: SignOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
