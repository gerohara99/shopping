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
  update: {
    marginTop: 30,
  },
  addButton: {
    marginTop: 15,
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
});

const UpdateButton = MKButton.coloredButton()
  .withText('UPDATE')
  .build()

type props = {
  saveShoppingItem: function,
  formUpdate: function,
  navigation: function,
  shoppingItemSelectedKey: String,
  shoppingItemSelected: String,
  shopSelected: string
  }

type state = {}

class UpdateShoppingItem extends Component <props, state>{

  onUpdatePress() {
    const { shoppingItemSelectedKey, shoppingItemSelected, shopSelected } = this.props
    this.props.saveShoppingItem({ shoppingItemSelectedKey, shoppingItemSelected, shopSelected })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps='always'
                  keyboardDismissMode='on-drag'
      >
        <View style={styles.form}>
          <Text style={styles.title}>Update Shopping Item</Text>
          <MKTextField
              textInputStyle={styles.fieldStyles}
              placeholder={'Shop....'}
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
        <View style={styles.update}>
            <UpdateButton onPress={this.onUpdatePress.bind(this)}/>
          </View>
        </View>
      </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
  const { shoppingItemSelectedKey, shoppingItemSelected, shopSelected } = state
  return ({ shoppingItemSelectedKey, shoppingItemSelected, shopSelected })
}

export default connect(mapStateToProps, actions)(UpdateShoppingItem)
