/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import firebase from 'firebase'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Login from './Login'
import Loader from './Loader'
import Navigation from './Navigation'
import reducers from '../reducers/ShoppingReducer'
import thunk from 'redux-thunk'

const store = createStore(
  reducers,
  applyMiddleware(thunk),
)

type props = {}

type state = {
  loggedIn: boolean,
}

export default class App extends Component <props, state> {
  state = { loggedIn: false};

  signout() {
    AsyncStorage.clear(); // to clear the token 
    this.setState({ loggedIn: false });
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyArUsFOCEjBgtgpyvgAEwBcYIr_IhFEIV8",
      authDomain: "shopping-44bca.firebaseapp.com",
      databaseURL: "https://shopping-44bca.firebaseio.com",
      projectId: "shopping-44bca",
      storageBucket: "shopping-44bca.appspot.com",
      messagingSenderId: "783286480391"
    });

    AsyncStorage.getItem('token').then((token) => {
     if (token) {
      this.setState({ loggedIn: true })
      } else {
       console.log('Not Logged in');
      }
    })
  }

    renderInitialView() {
      switch (this.state.loggedIn) {
        case true:
          return <Navigation signOut={this.signout.bind(this)} />
        case false:
          return <Login />
        default:
          return <Loader size="large" />
      }
    }
    render() {
      return (
        <Provider store={store}>
              {this.renderInitialView()}
        </Provider>
      );
  }
}
