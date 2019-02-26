import { StackNavigator,  TabNavigator } from 'react-navigation'
import ShoppingItemList from './ShoppingItemList'
import ShopList from './ShopList'
import AddShoppingItem from './AddShoppingItem'

const Navigation =  TabNavigator ({
    ShoppingItemList: { screen: ShoppingItemList },
    AddShoppingItem: { screen: AddShoppingItem },
    ShopList: { screen: ShopList },
}, {
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: '#80cbc4',
        swipeEnabled: true,
        showLabel: false,
        style: {
            backgroundColor: '#26a69a',
        },
    },
})

export default Navigation
