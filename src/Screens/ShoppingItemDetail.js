/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'

import {  Text,
          View,
        } from 'react-native'

import { connect } from 'react-redux'
import { getTheme } from 'react-native-material-kit'
import * as actions from '../actions'
import DetailsView from './DetailsView'
import UpdateShoppingItem from './UpdateShoppingItem'

const theme = getTheme()

type props = {
  toUpdate: boolean,
  shoppingItemSelectedKey: String,
  shoppingItemSelected: String,
  shopSelected: String
}

type state = {}

class ShoppingItemDetail extends Component <props, state> {
  renderDetails() {
    if (this.props.toUpdate) {
      return <UpdateShoppingItem />
    } else {
      return <DetailsView />
    }
  }

  render() {
    return (
      <View>
        {this.renderDetails()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  const { shoppingItemSelectedKey, shoppingItemSelected, shopSelected, toUpdate } = state
  return ({ shoppingItemSelectedKey, shoppingItemSelected, shopSelected, toUpdate })
}

export default connect(mapStateToProps, actions)(ShoppingItemDetail)
