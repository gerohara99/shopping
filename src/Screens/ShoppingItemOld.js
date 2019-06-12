import React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import { getTheme } from 'react-native-material-kit'
import { connect } from 'react-redux'

import * as actions from '../actions'

const theme = getTheme();

const styles = StyleSheet.create({
  title: {
    top: 20,
    left: 10,
    fontSize: 20,
    marginTop: 20,
  }
})

const ShoppingItem = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.selectShoppingItem(props.shoppingItems)}>
      <View>
        <Text style={[styles.title]}>{props.shoppingItems.shoppingItem} </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default connect(mapStateToProps, actions)(ShoppingItem)