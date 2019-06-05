/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, ListView, TouchableWithoutFeedback } from 'react-native'
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
  detailView: boolean,
  shoppingItems: {}
}
type state = {}

class ShoppingItemList extends Component<props, state> {

  renderInitialView() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    
    this.dataSource = ds.cloneWithRows(this.props.shoppingItems)

    if (this.props.detailView === true) {
      return (
        <ShoppingItemDetail />)
        
    } else {
      return (
        <ListView
          enableEmptySections={true}
          dataSource={this.dataSource}
          renderRow={(rowData) =>

            <TouchableWithoutFeedback onPress={() => this.props.selectShoppingItem(rowData)} >

              <View>
                <Text style={[styles.title]}>{rowData.shoppingItem} </Text>
              </View>
            </TouchableWithoutFeedback>
            }
        />)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.screenTitle}> Shopping Items </Text>
        {this.renderInitialView()}
      </View>
    );
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