import { StackNavigator,  TabNavigator } from 'react-navigation'
import ShoppingItemList from './ShoppingItemList'
import ShopList from './ShopList'
import AddShoppingItem from './AddShoppingItem'
import Logout from './Logout'

const Navigation =  TabNavigator ({
    ShoppingItemList: { screen: ShoppingItemList },
    ShopList: { screen: ShopList },
    AddShoppingItem: { screen: AddShoppingItem },
    Logout: { screen: Logout },

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
