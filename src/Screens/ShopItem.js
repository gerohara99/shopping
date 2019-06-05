import React from 'react'
import { Text, View, StyleSheet, Image, ListView } from 'react-native'
import { getTheme } from 'react-native-material-kit'

const theme = getTheme()

const styles = StyleSheet.create({
  
  shop: {
    top: 20,
    left: 10,
    fontSize: 25,
    marginTop: 30,
    backgroundColor: 'black',
    color: 'white',
  },
  shoppingItem: {
    top: 20,
    left: 10,
    fontSize: 20,
    marginTop: 20,
  }
});

const ShopItem = (props) => {
    return (
      <View>
        <View>
        <Text style={[styles.shop]}>{props.shops.shop}</Text>
        {props.shops.shopping.map((shops) => {
          return (
            <Text style= { [styles.shoppingItem]} key={shops.uid} >
                {shops.shoppingItem} 
              </Text>
          )
        })}
      </View>
    </View>
  )
}

export default ShopItem