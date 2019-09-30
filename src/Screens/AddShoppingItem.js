/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit'
import { connect } from 'react-redux'
import * as actions from '../actions'

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  fieldStyles: {
    height: 40,
    color: MKColor.Orange,
  },
  addButton: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  add: {
    marginTop: 30,
  },
})

const AddButton = MKButton.coloredButton()
  .withText('ADD')
  .build()

type props = {
  createNewShoppingItem: function,
  navigation: function,
  formUpdate: function,
  shop: string,
  shoppingItem: string,
}

type state = {}

class AddShoppingItem extends Component <props, state> {

  onAddPress() {
    if (this.props.shoppingItemSelected) {
      this.props.createNewShoppingItem()
      this.props.navigation.navigate('ShopList')
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps ='always'
                  keyboardDismissMode='on-drag'>
                  
        <View style={styles.form}>
          <Text style={styles.title}>Add a new Shopping Item</Text>
          <MKTextField
              textInputStyle={styles.fieldStyles}
              placeholder={'Shop.... if left empty will be set as [Any Shop]'}
              tintColor={MKColor.Teal}
              value={this.props.shopSelected}
              onChangeText={value =>
                this.props.formUpdate({prop: 'shopSelected', value})}
          />
          <MKTextField
              textInputStyle={styles.fieldStyles}
              placeholder={'Shopping Item....'}
              tintColor={MKColor.Teal}
              value={this.props.shoppingItemSelected}
              onChangeText={value =>
                this.props.formUpdate({prop: 'shoppingItemSelected', value})}
          />
          <View style={styles.add}>
            <AddButton onPress={this.onAddPress.bind(this)}/>
          </View>
        </View>
      </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
  const { shopSelected, shoppingItemSelected } = state
  return ({shopSelected, shoppingItemSelected})
}

export default connect(mapStateToProps, actions)(AddShoppingItem)
