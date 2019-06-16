/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'

import {  Text,
          View,
          StyleSheet,
          Image,
          ScrollView,
          TouchableOpacity,
          Linking } from 'react-native'

import { connect } from 'react-redux'
import { getTheme } from 'react-native-material-kit'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import * as actions from '../actions'

const theme = getTheme()

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    paddingBottom: 20,
    marginBottom: 20,
    borderColor: 'lightgrey',
    borderWidth: 0.5,
  },
  image: {
      flex: 0,
      height: 100,
      width: 333,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
  },
  closeIcon: {
      position: 'absolute',
      top: -1,
      left: 260,
  },
  icon: {
      position: 'absolute',
      top: 15,
      left: 0,
      color: 'white',
      backgroundColor: 'rgba(255,255,255,0)',
  },
  textArea: {
      flexDirection: 'row',
      paddingLeft: 20,
      paddingTop: 10,
      width: 260,
  },
  editIcon: {
    color: '#26a6e4',
  },
  sections: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    width: 100,
  },
  deleteIcon: {
    color: '#e9a69a',
  },
});

type props = {
  noneSelected: function,
  updateShoppingItem: function,
  deleteShoppingItem: function,
  shoppingItemSelectedKey: string,
  shoppingItemSelected: string,
  shopSelected: string
}

type state = {}

class DetailsView extends Component <props, state> {
    handleClick = (link) => {
        Linking.canOpenURL(link).then(supported => {
            if (supported) {
                Linking.openURL(link);
            } else {
                console.log('Don\'t know how to open URI: ' + link);
            }
        })
    }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[theme.cardStyle, styles.card]}>
          <Image
              source={require('../images/background.jpg')}
              style={[theme.cardImageStyle, styles.image]}
          />
          <EvilIcon name={'cart'} size={100} style={styles.icon}/>
          <TouchableOpacity style={styles.closeIcon}
            onPress={() => this.props.noneSelected()}>
          <EvilIcon name={'close'} size={100} style={styles.icon} />
          </TouchableOpacity>

          <View style={styles.textArea}>
           <Text style={theme.cardContentStyle}>
             {this.props.shopSelected}
           </Text>
          </View>

          <View style={styles.textArea}>
           <Text style={theme.cardContentStyle}>
             {this.props.shoppingItemSelected}
           </Text>
          </View>

          <View>
              <TouchableOpacity style={styles.sections}
              onPress={() => { this.props.updateShoppingItem(
                                this.props.shoppingItemSelectedKey,
                                this.props.shoppingItemSelected,
                                this.props.shopSelected) }}>
                 <MaterialIcon name={'autorenew'} size={40} style={styles.editIcon}/>
                 <Text style={theme.cardContentStyle}>EDIT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sections}
                  onPress={() => { this.props.deleteShoppingItem
                                  (this.props.shoppingItemSelectedKey)}}>
                 <MaterialIcon name={'delete-forever'} size={40} style={styles.editIcon}/>
                 <Text style={theme.cardContentStyle}>DELETE</Text>
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  const { shoppingItemSelectedKey, shoppingItemSelected, shopSelected } = state
  return ({ shoppingItemSelectedKey, shoppingItemSelected, shopSelected })
}

export default connect(mapStateToProps, actions)(DetailsView)
