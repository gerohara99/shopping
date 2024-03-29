/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Component } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-native'
import * as actions from '../actions'
import firebase from 'firebase'

type props = {
  signOut: function,
}

class SignOutScreen extends Component {

  componentWillMount() {

    Alert.alert('You have been logged out.')

    firebase.auth().signOut()
      .catch((error) => {
          Alert.alert(error.message)
      })

    this.props.signOut()
    this.props.navigation.navigate('SignInScreen')
  }

  render() {
    return (null)
  }
}

const mapStateToProps = state => {
  const { email, password } = state
  return ({ email, password })
}

export default connect(mapStateToProps, actions)(SignOutScreen)