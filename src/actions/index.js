/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import firebase from 'firebase'

export const reauthenticate = () => {
  return (dispatch, getState) => {
    const state = getState()
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      state.email, state.password)
    return user.reauthenticateWithCredential(cred);
  }
}

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

export const changePassword = () => {
  return (dispatch, getState) => {
    const state = getState()
    reauthenticate(state.password).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(state.newPassword).then(() => {
          alert.alert("Password updated!");
        }).catch((error) => { alert.alert(error) })
    }).catch((error) => { alert.alert(error); })
    dispatch({ type: 'NEW_PASSWORD' })
  }
}

export const changeEmail = () => {
  return (dispatch, getState) => {
    const state = getState()
    reauthenticate(state.password).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(state.newEmail).then(() => {
        alert.alert("Email updated!");
      }).catch((error) => { alert.alert(error) })
    }).catch((error) => { alert.alert(error) })
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
      const shop = state.shopSelected
      const shoppingItem = state.shoppingItemSelected

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
