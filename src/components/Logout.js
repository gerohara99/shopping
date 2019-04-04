/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/Feather'

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

type props = {
  SignOut: function,
}
type state = {}

export default class Logout extends Component<props, state> {
  static navigationOptions = {
    tabBarLabel: 'Logout',
    tabBarIcon: ({ tintColor }) => (
      <Icon name={'power'} size={40} style={styles.icon} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.screenTitle}> Logout </Text>
        {this.props.SignOut()}
      </View>
    );
  }
}