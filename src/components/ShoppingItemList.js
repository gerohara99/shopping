/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, ListView } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import ShoppingItem from './ShoppingItem'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import ShoppingItemDetail from './ShoppingItemDetail'
import { loadInitialShoppingItems } from '../actions'

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
  loadInitialShoppingItems: function,
  detailView: boolean,
  shoppingItems: {}
}
type state = {}

class ShoppingItemList extends Component<props, state> {
  static navigationOptions = {
    tabBarLabel: 'Shopping',
    tabBarIcon: ({ tintColor }) => (
      <EvilIcon name={'cart'} size={50} style={styles.icon} />
    )
  }

  componentWillMount() {
    this.props.loadInitialShoppingItems()
  }

  renderInitialView() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(this.props.shoppingItems);

    if (this.props.detailView === true) {
      return (
        <ShoppingItemDetail />
      )
    } else {
      return (
        <ListView
          enableEmptySections={true}
          dataSource={this.dataSource}
          renderRow={(rowData) =>
            <ShoppingItem shoppingItems={rowData} />}
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
  };
};

export default connect(mapStateToProps, { loadInitialShoppingItems })(ShoppingItemList)
