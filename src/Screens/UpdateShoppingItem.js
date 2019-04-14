/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
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
  shop: string,
  shoppingItem: string,
  uid: string,
  }

type state = {}

class UpdateShoppingItem extends Component <props, state>{
  static navigationOptions = {
    tabBarLabel: 'Add Shopping',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'plus'}
        size={70}
        style={[{ color: tintColor }, styles.icon]}
      />
    )
  }

  onUpdatePress() {
    const { shop, shoppingItem, uid } = this.props
    this.props.saveShoppingItem({ shop, shoppingItem, uid })
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.title}>Update Shopping Item</Text>
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
        <View style={styles.update}>
            <UpdateButton onPress={this.onUpdatePress.bind(this)}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { shop, shoppingItem, uid} = state
  return ({ shop, shoppingItem, uid})
}

export default connect(mapStateToProps, actions)(UpdateShoppingItem)
