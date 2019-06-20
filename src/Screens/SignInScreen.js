/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit'
//import { navigation } from 'react-navigation';
import Loader from './Loader'
import firebase from 'firebase'
import { connect } from 'react-redux'
import * as actions from '../actions'

const SignInButton = MKButton.coloredButton()
    .withText('SIGN IN')
    .build()

const styles = StyleSheet.create({
    form: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
    },
    fieldStyles: {
        height: 40,
        color: MKColor.Orange,
        width: 200,
    },
    loginButtonArea: {
        marginTop: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
    },
})

type props = {
  signIn: function,
  email: String,
  password: String

}

type state = {}

class SignInScreen extends Component <props, state> {

  
  onButtonPress() {
    const { email, password } = this.props

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case "auth/network-request-failed":
            Alert.alert("Error connecting to Database please try later"),
            this.props.navigation.navigate('SignInScreen')
            break
          case "auth/invalid-email":
            Alert.alert("Email address badly formatted"),
            this.props.navigation.navigate('SignInScreen')
            break
          default:
            firebase.auth().createUserWithEmailAndPassword(email, password)
              .catch((error) => {(
                Alert.alert(error.message),
                this.props.navigation.navigate('SignInScreen'))
                })
              .then(
                this.props.signIn(),
                this.props.loadInitialShoppingItems(),
                this.props.navigation.navigate('HomeScreen'))
        }
      })
    }

  renderLoader() {
    const { loading } = this.props

    if (loading) {
        return <Loader size="large"/>;
    } else {
        return <SignInButton onPress={this.onButtonPress.bind(this)} />
    }
  }

  render() {
    const { form, fieldStyles, loginButtonArea } = styles

    return (
      <View style={form}>
        <Text style={styles.title}>Login or create an account</Text>
        <MKTextField
          textInputStyle={styles.fieldStyles}
          placeholder={'Email....'}
          tintColor={MKColor.Teal}
          value={this.props.email}
          onChangeText={value =>
            this.props.formUpdate({ prop: 'email', value })}
        />

        <MKTextField
          textInputStyle={styles.fieldStyles}
          placeholder={'Password....'}
          tintColor={MKColor.Teal}
          value={this.props.password}
          onChangeText={value =>
            this.props.formUpdate({ prop: 'password', value })}
          password={true}
        />
        <View style={loginButtonArea}>
            {this.renderLoader()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { email, password } = state
  return ({ email, password })
}

export default connect(mapStateToProps, actions)(SignInScreen)