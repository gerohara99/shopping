/*

*
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import { Text, View, StyleSheet, SectionList, TouchableOpacity } from 'react-native'
import { CheckBox } from 'react-native-elements'
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
  headerTitle: {
    top: 20,
    left: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  sectionTitle: {
    top: 20,
    left: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,

  },
  shoppingItem: {
    left: 10,
    fontSize: 25,
  },
  tableFormat: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    left: 10,
  },
  rowFormat: {
    flex: 1,
    alignSelf: 'stretch', 
    flexDirection: 'row',
  },
  cellFormat: {
    flex: 1, 
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  cb: {
    marginLeft: 16,
    marginTop: 57,
    alignItems: 'center',
    flex: 1
  }
})

type props = {
  shops: {},
  deleteShoppingItem: function
}

type state = {}

class ShopList extends Component<props, state>{

  renderSection = (headerItem) => {
    return (<Text
      style={styles.sectionTitle}>{headerItem.section.key}
    </Text>)
  }  
  
  renderItem = (item) => {
    return (
      <TouchableOpacity key={item.id}>
        <View style={styles.tableFormat}>
          <View style={styles.rowFormat}>
            <View style={styles.cellFormat} >
              <Text style={styles.shoppingItem}>{item.item.shoppingItem}</Text>
            </View>
            <View style={styles.cellFormat} >
              <CheckBox style={styles.cb}
                onPress={() => this.deleteShopping(item.item)}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
  )}    


  deleteShopping = (item) => {
    this.props.selectShoppingItem(item)
    this.props.deleteShoppingItem()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}> Shopping List</Text>
          <SectionList
            renderItem={this.renderItem}
            renderSectionHeader={this.renderSection}
            sections={this.props.shops}
            keyExtractor={(item) => item.uid}
          />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const shoppingItems = _.map(state.shoppingItems, (val, uid) => {
    return { ...val, uid }
  })

  var shops = _.groupBy(shoppingItems, s => s.shop)
  shops = _.reduce(shops, (acc, next, index) => {
    acc.push({ key: index, data: next })
    return acc
  }, [])

  return { shops, }
}

export default connect(mapStateToProps, actions)(ShopList)