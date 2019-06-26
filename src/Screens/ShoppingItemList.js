/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import _ from 'lodash'
import ShoppingItemDetail from './ShoppingItemDetail'
import * as actions from '../actions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 353,
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingLeft: 20,
  },
  title: {
    top: 20,
    left: 10,
    fontSize: 20,
    marginTop: 20,
  },
  screenTitle: {
    top: 20,
    left: 10,
    fontSize: 30,
    marginTop: 30,
  },
})

type props = {
  detailView: boolean,
  shoppingItems: {},
  selectShoppingItem: function
}
type state = {}

class ShoppingItemList extends Component<props, state> {

  renderHeader = () => {
    return (<Text style={styles.screenTitle}> Shopping Items </Text>)
  }

  render() {
    if ( this.props.detailView ) {
      return (
        <View style={styles.container}>
          <Text style={styles.screenTitle}> Shopping Items </Text>
          <ShoppingItemDetail />
        </View>
      )
    } else {
      return (
          <FlatList
            ListHeaderComponent={this.renderHeader}
            data={this.props.shoppingItems}
            renderItem={({ item }) => (
            <View style={styles.container}>
              <ListItem
                title = {item.shoppingItem}
                onPress={() => this.props.selectShoppingItem(item)}>
              </ListItem>
            </View>
            )}
            keyExtractor={(item) => item.uid}
          />
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
  }
}

export default connect(mapStateToProps,actions)(ShoppingItemList)