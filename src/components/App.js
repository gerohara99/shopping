/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import Login from './Login';
import Loader from './Loader';
import Navigation from './Navigation';
import reducers from '../reducers/PeopleReducer';
import thunk from 'redux-thunk'
import compose from 'lodash'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(thunk)),
)

export default class App extends Component {
  state = { loggedIn: null};

    componentWillMount() {
        firebase.initializeApp({
          apiKey: "AIzaSyAaqrgCeaFt_8yRABVzflOjEuko-c7JhgE",
          authDomain: "crmlinkedin2-3238e.firebaseapp.com",
          databaseURL: "https://crmlinkedin2-3238e.firebaseio.com",
          projectId: "crmlinkedin2-3238e",
          storageBucket: "crmlinkedin2-3238e.appspot.com",
          messagingSenderId: "943960142281"
        });

        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({ loggedIn: true });
          } else {
            this.setState({ loggedIn: false});
          }
        });
    }

    renderInitialView() {
      switch (this.state.loggedIn) {
        case true:
          return <Navigation />
        case false:
          return <Login />;
        default:
          return <Loader size="large" />;
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
