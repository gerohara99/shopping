/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import firebase from 'firebase'

export const signIn = () => {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        {dispatch({ type: 'SIGN_IN', payload: user.uid })}
        firebase.database().ref(`/users/${user.uid}/shopping`)
        .on('value', async snapshot => {
          dispatch({ type: 'INITIAL_FETCH', payload: snapshot.val() })
        })
      }
    })
  }
}

export const forgotPassword = () => {
  return (dispatch, getState) => {
      const state = getState()
      firebase.auth().sendPasswordResetEmail(state.email)
      .then(() => {alert('Reset instructions sent to ' + state.email)})
      dispatch({ type: 'NEW_PASSWORD' })
    }
}

export const signOut = () => {
  return {
    type: 'SIGN_OUT',
  }
}

export const selectShoppingItem = 
  (rowSelected) => {
    return {
        type: 'SELECTED_SHOPPING_ITEM',
        payload: rowSelected,
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

export const createNewShoppingItem = () => {

    return(dispatch, getState) => {
      const state = getState()
      var shop = state.shopSelected
      const shoppingItem = state.shoppingItemSelected

      if (!shop) {
        shop = "[Any Shop]"
      }

      firebase.database().ref(`/users/${state.currentUser}/shopping`)
        .push({ shop, shoppingItem })
      .catch(error => {
        alert("Firebase Error - ", error)
      })
      .then(() => {
        dispatch({type: 'NEW_SHOPPING_ITEM'})
      })
    }
}

export const deleteShoppingItem = () => {
  return(dispatch, getState) => {
    const state = getState()
    try {
      firebase.database().ref(`/users/${state.currentUser}/shopping/${state.shoppingItemSelectedKey}`)
      .remove()
      .then(() => { dispatch({ type: 'DELETE_SHOPPING_ITEM'})})
    } catch (error) {
      alert("Firebase Error - ", error)
    }
  }
}


export const updateShoppingItem = (prop, value) => {
  return {
    type: 'UPDATE_SHOPPING_ITEM',
    payload: { prop, value },
  }
}

export const saveShoppingItem = () => {

  return(dispatch, getState) => {
    const state = getState()
    const shop = state.shopSelected
    const shoppingItem =state.shoppingItemSelected
    try {
      firebase.database().ref(`/users/${state.currentUser}/shopping/${state.shoppingItemSelectedKey}`)
        .set({ shop, shoppingItem })
      .then(() => { dispatch({ type: 'SAVE_SHOPPING_ITEM'})})
    } catch (error) {
      alert("Firebase Error - ", error)
    }
  }
}
