/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import SignIn from './SignIn'

type props = {
  signIn: function,
}

type state = {}

export default class WelcomeScreen extends Component<props, state> {
  render() {
    return ( <SignIn /> )
  }
}