/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import firebase from 'firebase'

export const signIn = () => {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      return {
        type: 'SIGN_IN',
        payload: { currentUser: user.uid }
      }  

    } else {
      console.log("no user logged in")
    }
  })
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
  = ({ shoppingItem, shop }) => {

    return(dispatch) => {
      firebase.database().ref(`/users/${this.props.currentUser.user.uid}/shopping`)
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

    return(dispatch) => {
      firebase.database().ref(`/users/${this.props.currentUser.user.uid}/shopping`)
      .on('value',snapshot => {
        dispatch({type: 'INITIAL_FETCH', payload: snapshot.val()})
        }, error => {
          console.log(error)
        }
      )
    }
}
export const deleteShoppingItem = (shoppingItemSelectedKey) => {
  return(dispatch) => {
    try {
      firebase.database().ref(`/users/${this.props.currentUser.user.uid}/shopping/${shoppingItemSelectedKey}`)
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
  = ({ shoppingItem, shop }) => {

  return(dispatch) => {
    try {
      firebase.database().ref(`/users/${this.props.currentUser.user.uid}/shopping/${uid}`)
        .set({ shop, shoppingItem })
      .then(() => { dispatch({ type: 'SAVE_SHOPPING_ITEM'})})
    } catch (error) {
      console.log("Firebase Error - ", error)
    }
  }
}
