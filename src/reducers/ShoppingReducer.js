const initialState = {
    email: '',
    password: '',
    currentUser : '',
    shoppingItems: [],
    shoppingItemKeySelected: null,
    shoppingItemSelected: '',
    shopSelected: '',
    detailView: false,
    toUpdate: false,
    loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {

      case 'SIGN_IN':
        return {
          ...state,
          loading: true,
          currentUser: action.payload
        }
        
      case 'SIGN_OUT':
        return initialState        
    
      case 'INITIAL_FETCH': 
        return {
          ...state,
          shoppingItems: action.payload
        }
        
      case 'SELECTED_SHOPPING_ITEM': 
        return {
          ...state,
          detailView: true,
          shoppingItemKeySelected: action.payload.uid,
          shoppingItemSelected: action.payload.shoppingItem,
          shopSelected: action.payload.shop
        }
        
      case 'NONE_SELECTED': 
        return {
          ...state,
          detailView: false,
          shoppingItemKeySelected: null,
          shoppingItemSelected: '',
          shopSelected: ''
        }
        
      case 'FORM_UPDATE': 
        return {
          ...state,
          [action.payload.prop]: action.payload.value
        }
        
      case 'NEW_SHOPPING_ITEM': 
        return {
          ...state,
          shoppingItemKeySelected: null,
          shoppingItemSelected: '',
          shopSelected: ''
        }
        
      case 'SAVE_SHOPPING_ITEM': 
        return {
          ...state,
          toUpdate: false,
          detailView: false,
          shoppingItemKeySelected: null,
          shoppingItemSelected: '',
          shopSelected: ''
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
          [action.payload.prop]: action.payload.value
        }
        
      case 'DELETE_SHOPPING_ITEM': 
        return {
          ...state,
          detailView: false,
          shoppingItemKeySelected: null,
          shoppingItemSelected: '',
          shopSelected: ''
        }
        
      default:
        return state
    }
}
