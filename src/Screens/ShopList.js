/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, SectionList } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
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
  sectionTitle: {
    top: 20,
    left: 10,
    fontSize: 30,
    marginTop: 30,
  }
})

type props = {
  shops: {}
}

type state = {}

class ShopList extends Component <props, state>{
  renderItem = (item) => {
    return<Text style={styles.title}>{item.item.shoppingItem}</Text>
  }

  renderHeader = (headerItem) => {
    return (<Text 
              style={styles.sectionTitle}>{headerItem.section.key}
            </Text>)
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={this.renderHeader}
          sections={this.props.shops}
          keyExtractor={(item) => item.uid}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const shoppingItems = _.map(state.shoppingItems, (val, uid) => {
    return {...val,uid}
  })

  var shops = _.groupBy(shoppingItems, s => s.shop)
  shops = _.reduce(shops, (acc, next, index) => {
    acc.push({key: index, data: next })
    return acc
  }, [])

  return {shops,}
}

export default connect(mapStateToProps,actions)(ShopList)
