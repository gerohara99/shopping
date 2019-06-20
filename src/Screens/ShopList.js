/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import _ from 'lodash'
import ShopItem from './ShopItem'
import * as actions from '../actions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  screenTitle: {
    top: 20,
    left: 10,
    fontSize: 30,
    marginTop: 30,
  },
})

type props = {
  shops: {}
}

type state = {}

class ShopList extends Component <props, state>{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.screenTitle}> Shopping Items By Shop </Text>
        <FlatList
          data={this.props.shoppingItems}
          renderItem={({ item }) => (
            <ListItem >
              <ShopItem shops={item} />
            </ListItem>
          )}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const shoppingItems = _.map(state.shoppingItems, (val, uid) => {
    return {...val,uid}
  })

const shops =
  _.chain(shoppingItems)
  .groupBy('shop')
  .map((value, key) => {
    return {
      shop: key,
      shopping: value
    }
  })
  .value()

  return {
    shops,
  }
}

export default connect(mapStateToProps,actions)(ShopList)
