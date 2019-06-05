/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import * as actions from '../actions'
import _ from 'lodash'
import ShoppingItemDetail from './ShoppingItemDetail'

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
  title: {
    top: 20,
    left: 10,
    fontSize: 20,
    marginTop: 20,
  }
})

type props = {
  loadInitialShoppingItems: function,
  detailView: boolean,
  shoppingItems: {}
}
type state = {}

class ShoppingItemList extends Component<props, state> {

  render() {
    console.log(this.props.shoppingItems)

    if (this.props.detailView === true) {
      return (
        <ShoppingItemDetail />
      )
    } else {
      return (
        <List>
          <FlatList
            data={this.props.shoppingItems}
            renderItem={({ item }) => (
              <ListItem
                subtitle={item.uid}
              />
            )}
          />
        </List>
      )
    }
  }
}

const mapStateToProps = state => {
  const shoppingItems = _.map(state.shoppingItems, (val, uid) => {
    return { ...val, uid }
  })
  return {
    shoppingItems,
    detailView: state.detailView,
  };
};

export default connect(mapStateToProps, actions)(ShoppingItemList)