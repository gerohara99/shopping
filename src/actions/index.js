import firebase from 'firebase'

export const selectShoppingItem = (shoppingItemId) => {
    return {
        type: 'SELECTED_SHOPPING_ITEM',
        payload: shoppingItemId,
    }
}

export const noneSelected = () => {
    return {
        type: 'NONE_SELECTED',
    }
}

export const Logout = () => {
  return {
    type: 'LOGOUT',
  }
}

export const formUpdate = ({ prop, value }) => {
    return {
        type: 'FORM_UPDATE',
        payload: { prop, value },
    }
}

export const createNewShoppingItem
  = ({ shop, shoppingItem }) => {
    const { currentUser } = firebase.auth()

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
export const deleteShoppingItem = (uid) => {
  const { currentUser } = firebase.auth()
  return(dispatch) => {
    try {
      firebase.database().ref(`/users/${currentUser.uid}/shopping/${uid}`)
      .remove()
      .then(() => { dispatch({ type: 'DELETE_SHOPPING_ITEM'})})
    } catch (error) {
      console.log("Firebase Error - ", error)
    }
  }
}


export const updateShoppingItem = (shoppingItemSelected) => {
  return {
    type: 'UPDATE_SHOPPING_ITEM',
    payload: shoppingItemSelected,
  }
}

export const saveShoppingItem
  = ({ shop, shoppingItem, uid}) => {
  const { currentUser } = firebase.auth()

  return(dispatch) => {
    try {
      firebase.database().ref(`/users/${currentUser.uid}/shopping/${uid}`)
        .set({ shop, shoppingItem, uid})
      .then(() => { dispatch({ type: 'SAVE_SHOPPING_ITEM'})})
    } catch (error) {
      console.log("Firebase Error - ", error)
    }
  }
}
