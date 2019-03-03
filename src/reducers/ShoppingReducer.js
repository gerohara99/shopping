const initialState = {
    shoppingItems: [],
    detailView: false,
    shoppingItemSelected: null,
    shop: '',
    shoppingItem: '',
    loadingShoppingItems: false,
    toUpdate: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'INITIAL_FETCH': {
          return {
            ...state,
            shoppingItems: action.payload,
          }
        }
        case 'SELECTED_SHOPPING_ITEM':
            return {
                ...state,
                detailView: true,
                shoppingItemSelected: action.payload,
            }

        case 'NONE_SELECTED':
            return {
                ...state,
                detailView: false,
                shoppingItemSelected: null,
            }

        case 'FORM_UPDATE':
          return {
            ...state,
            [action.payload.prop]: action.payload.value
          }

        case 'NEW_SHOPPING_ITEM':
          return {
            ...state,
            shop: '',
            shoppingItem: '',
            uid: '',
          }

        case 'SAVE_SHOPPING_ITEM':
          return {
            ...state,
            toUpdate: false,
            detailView: false,
            shop: '',
            shoppingItem: '',
            uid: '',
          }

        case 'ADD_SHOPPING_ITEM':
          return {
            ...state,
            ...action.newShoppingItem
          }

        case 'UPDATE_SHOPPING_ITEM':
          return {
            ...state,
            toUpdate: true,
            shop: action.payload.shop,
            shoppingItem: action.payload.shoppingItem,
            uid: action.payload.uid,
          }

        case 'DELETE_SHOPPING_ITEM':
          return {
            ...state,
            detailView: false,
            shoppingItemSelected: null
          }

        default:
            return state;
    }
}
