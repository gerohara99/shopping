/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit'
import Loader from './Loader'
import firebase from 'firebase'
import { connect } from 'react-redux'

import * as actions from '../actions'

const styles = StyleSheet.create({
    form: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    fieldStyles: {
        height: 40,
        color: MKColor.Orange,
        width: 200,
    },
    buttonArea: {
        marginTop: 30,
    },
    createAccount: {
      marginTop: 50,
      color: MKColor.Orange,
    },
    forgotPassword: {
      marginTop: 50,
      color: MKColor.Orange,
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
    }
})

const SignInButton = MKButton.coloredButton()
  .withText('SIGN IN')
  .build()

type props = {
  signIn: function,
  forgotPassword: function,
  CreateAccountScreen: function,
  email: string,
  password: string,
}

type state = {}

class SignInScreen extends Component <props, state> {

  componentWillMount() {
    const { isLoggedIn } = this.props

//    if (isLoggedIn) {
//      this.props.navigation.navigate('HomeScreen')
//    }
  }

  onSignInButtonPress() {
    const { email, password } = this.props

    if (email && password) {
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
            Alert.alert(error.code),
            this.props.navigation.navigate('SignInScreen')
            break
        }
      }).then(
        this.props.signIn(),
        this.props.navigation.navigate('HomeScreen')) 
    }
  }

  onForgotPassword() {
    const { email } = this.props

    if (email) {
      this.props.forgotPassword()
      this.props.navigation.navigate('SignInScreen')
    } else {
      Alert.alert("Please enter email address to send reset instructions to")
    }
  }

  onCreateAccountPress() {
    const { email, password } = this.props

    if (email && password) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        Alert.alert(error.message),
        this.props.navigation.navigate('SignInScreen')
      }).then(
        this.props.signIn(),
        this.props.navigation.navigate('HomeScreen'))
    } else {
        Alert.alert("Please enter email & password for accout to create")
      }
  }

  renderLoader() {
    const { buttonArea, forgotPassword, createAccount} = styles
    const { loading } = this.props

    if (loading) {
        return <Loader size="large"/>
    } else {
        return (
          <View>
            <SignInButton style={buttonArea}
              onPress={this.onSignInButtonPress.bind(this)}/>

            <Text style={forgotPassword}
              onPress={this.onForgotPassword.bind(this)}>
              Forgot Password?
            </Text>

            <Text style={createAccount}
              onPress={this.onCreateAccountPress.bind(this)}>
              Create Account?
            </Text>

          </View>
        )
      }
  }  

  render() {
    const { form, fieldStyles,title } = styles

    return (
      <View style={form}>
        <Text style={title}>Login</Text>
        <MKTextField
          textInputStyle={fieldStyles}
          placeholder={'Household Email....'}
          tintColor={MKColor.Teal}
          value={this.props.email}
          onChangeText={value =>
            this.props.formUpdate({ prop: 'email', value })}
        />

        <MKTextField
          textInputStyle={fieldStyles}
          placeholder={'Password....'}
          tintColor={MKColor.Teal}
          value={this.props.password}
          onChangeText={value =>
            this.props.formUpdate({ prop: 'password', value })}
          password={true}
        />

        <View>
            {this.renderLoader()}
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const { email, password, isLoggedIn } = state
  return ({ email, password, isLoggedIn })
}

export default connect(mapStateToProps, actions)(SignInScreen)