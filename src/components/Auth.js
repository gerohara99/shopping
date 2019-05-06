import { AsyncStorage } from "AsyncStorage";

export const USER_KEY = "user-shopping-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = async () => {
  try {
    await AsyncStorage.getItem(USER_KEY)
  } catch (error) {
    return false
  }
    return true
}
