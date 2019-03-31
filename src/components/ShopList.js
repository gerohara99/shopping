/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, ListView } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/Entypo'
import ShopItem from './ShopItem'

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
  static navigationOptions = {
    tabBarLabel: 'Shops',
    tabBarIcon: ({ tintColor }) => (
      <Icon name={'shop'} size={50} style={styles.icon} />
    )
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(this.props.shops);

    return (
      <View style={styles.container}>
        <Text style={styles.screenTitle}> Shopping Items By Shop </Text>
        <ListView
          enableEmptySections={true}
          dataSource={this.dataSource}
          renderRow={(rowData) =>
            <ShopItem shops={rowData} />
          }
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

export default connect(mapStateToProps)(ShopList)
