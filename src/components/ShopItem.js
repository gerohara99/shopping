import React from 'react'
import { Text, View, StyleSheet, Image, ListView } from 'react-native'
import { getTheme } from 'react-native-material-kit'
import Icon from 'react-native-vector-icons/MaterialIcons'

const theme = getTheme()

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },
  title: {
      top: 20,
      left: 80,
      fontSize: 26,
  },
  image: {
      height: 100,
  },
  action: {
      backgroundColor: 'black',
      color: 'white',
      paddingBottom: 5,
      paddingTop: 5,
  },
  icon: {
      position: 'absolute',
      top: 10,
      left: 10,
      color: 'white',
      backgroundColor: 'rgba(255,255,255,0)',
  },
});

const ShopItem = (props) => {
    return (
      <View>
        <View style={[theme.cardStyle, styles.card]}>
          <Image
            source={{ uri: '/Users/Ger/github/shopping/src/images/background.jpg'}}
            style={[theme.cardImageStyle, styles.image]}
          />
          <Icon
            name={'business'}
            size={80}
            style={styles.icon}
          />
        <Text style={[theme.cardTitleStyle, styles.title]}>{props.shops.shop}</Text>
        {props.shops.shopping.map((item) => {
          return (
              <Text key={name.uid} style={[theme.cardActionStyle, styles.action]}>
                {item.shoppingItem} 
              </Text>
          )
        })}
      </View>
    </View>
  );
};

export default ShopItem
