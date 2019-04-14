/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import _ from 'lodash'
import { onSignIn } from "./auth"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 353,
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingLeft: 20,
  },
  screenTitle: {
    top: 20,
    left: 10,
    fontSize: 30,
    marginTop: 30,
  },
})

type props = {}
type state = {}

export default class SignOut extends Component<props, state> {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.screenTitle}> Logout </Text>
        onSignIn().then(() => navigation.navigate("SignedOut"));
      </View>
    );
  }
}
