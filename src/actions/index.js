/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import firebase from 'firebase'

export const signIn = () => {
  return (dispatch) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if(user) {
          dispatch ({ type: 'SIGN_IN', payload: user.uid})
        } else {
          console.log("no user logged in")
        }
      })
    } 
}

export const signOut = () => {
  return {
    type: 'SIGN_OUT',
  }
}

export const selectShoppingItem = 
  ({prop, value}) => {
    return {
        type: 'SELECTED_SHOPPING_ITEM',
        payload: {prop, value}
    }
}

export const noneSelected = () => {
    return {
        type: 'NONE_SELECTED',
    }
}

export const formUpdate = ({ prop, value }) => {
    return {
        type: 'FORM_UPDATE',
        payload: { prop, value },
    }
}

export const createNewShoppingItem
  = ({ shoppingItemSelected, shopSelected }) => {

    const { currentUser } = firebase.auth()
    const shop = shopSelected
    const shoppingItem = shoppingItemSelected

    return(dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/shopping`)
        .push({ shop, shoppingItem })
      .catch(error => {
        console.log("Firebase Error - ", error)
      })
      .then(() => {
        dispatch({type: 'NEW_SHOPPING_ITEM'})
      })
    }
}

export const loadInitialShoppingItems = () => {
  const { currentUser } = firebase.auth()
    return(dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/shopping`)
      .on('value',snapshot => {
        dispatch({type: 'INITIAL_FETCH', payload: snapshot.val()})
        }, error => {
          console.log(error)
        }
      )
    }
}
export const deleteShoppingItem = (shoppingItemSelectedKey) => {
  const { currentUser } = firebase.auth()
  return(dispatch) => {
    try {
      firebase.database().ref(`/users/${currentUser.uid}/shopping/${shoppingItemSelectedKey}`)
      .remove()
      .then(() => { dispatch({ type: 'DELETE_SHOPPING_ITEM'})})
    } catch (error) {
      console.log("Firebase Error - ", error)
    }
  }
}


export const updateShoppingItem = (prop, value) => {
  return {
    type: 'UPDATE_SHOPPING_ITEM',
    payload: { prop, value },
  }
}

export const saveShoppingItem
   = ({ shoppingItemSelectedKey, shoppingItemSelected, shopSelected }) => {
    const { currentUser } = firebase.auth()
  return(dispatch) => {
    try {
      firebase.database().ref(`/users/${currentUser.uid}/shopping/${shoppingItemSelectedKey}`)
        .set({ shopSelected, shoppingItemSelected, shoppingItemSelectedKey })
      .then(() => { dispatch({ type: 'SAVE_SHOPPING_ITEM'})})
    } catch (error) {
      console.log("Firebase Error - ", error)
    }
  }
}
