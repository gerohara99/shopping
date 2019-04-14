import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, TabNavigator, SwitchNavigator} from "react-navigation";
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import Icon from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/Feather'
import SignedOut from "../Screens/SignedOut"
import SignedIn from "../Screens/SignedIn"
import ShoppingItemList from "../Screens/ShoppingItemList"
import AddShoppingItem from "../Screens/SignedOut"

import ShopList from "./ShopList"



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
});

export const SignedIn = createBottomTabNavigator(
  {
    ShoppingItemList: {
      screen: ShoppingItemList,
      navigationOptions: {
        tabBarLabel: "Shopping",
        tabBarIcon: ({ tintColor }) => (
          <EvilIcon name={'cart'} size={50}/>
        )
      }
    },
    ShopList: {
      screen: ShopList,
      navigationOptions: {
        tabBarLabel: "Shops",
        tabBarIcon: ({ tintColor }) => (
          <Icon name={'shop'} size={50} style={styles.icon} />
        )
      }
    },
    AddShoppingItem: {
      screen: AddShoppingItem,
      navigationOptions: {
        tabBarLabel: "Add Shopping",
        tabBarIcon: ({ tintColor }) => (
        <EvilIcon name={'plus'} size={60} style={styles.icon} />
        )
      }
    },
    SignOut: {
      screen: SignOut,
      navigationOptions: {
        tabBarLabel: "SignOut",
        tabBarIcon: ({ tintColor }) => (
        <Icon name={'power'} size={40} style={styles.icon} />
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
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
