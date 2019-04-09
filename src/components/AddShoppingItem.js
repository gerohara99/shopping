/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { onSignIn } from './auth'


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
    const { shop, shoppingItem }= this.props
    this.props.createNewShoppingItem({ shop, shoppingItem })

    onSignIn().then(() => navigation.navigate("SignedIn"));
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.title}>Add a new Shopping Item</Text>
          <MKTextField
              textInputStyle={styles.fieldStyles}
              placeholder={'Shop....'}
              tintColor={MKColor.Teal}
              value={this.props.shop}
              onChangeText={value =>
                this.props.formUpdate({prop: 'shop', value})}
          />
          <MKTextField
              textInputStyle={styles.fieldStyles}
              placeholder={'Shopping Item....'}
              tintColor={MKColor.Teal}
              value={this.props.shoppingItem}
              onChangeText={value =>
                this.props.formUpdate({prop: 'shoppingItem', value})}
          />
          <View style={styles.add}>
            <AddButton onPress={this.onAddPress.bind(this)}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { shop, shoppingItem } = state
  return ({shop, shoppingItem})
}

export default connect(mapStateToProps, actions)(AddShoppingItem)
