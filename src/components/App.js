import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import firebase from 'firebase'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import Login from './Login'
import Loader from './Loader'
import PeopleList from './PeopleList'
import reducers from '../reducers/PeopleReducer'

const store = createStore(reducers,
                          window.__REDUX_DEVTOOLS_EXTENSION__ &&
                          window.__REDUX_DEVTOOLS_EXTENSION__())


export default class App extends Component {

  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyAaqrgCeaFt_8yRABVzflOjEuko-c7JhgE",
      authDomain: "crmlinkedin2-3238e.firebaseapp.com",
      databaseURL: "https://crmlinkedin2-3238e.firebaseio.com",
      projectId: "crmlinkedin2-3238e",
      storageBucket: "crmlinkedin2-3238e.appspot.com",
      messagingSenderId: "943960142281"
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderInitialView() {
    switch (this.state.loggedIn) {
      case true:
        return <PeopleList />
      case false:
        return <Login />
      default:
        return <Loader size="large"/>
    }
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {this.renderInitialView()}
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
