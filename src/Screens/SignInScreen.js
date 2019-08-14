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
    loginButtonArea: {
        marginTop: 30,
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
  .withText('SIGN IN / CREATE ACCOUNT')
  .build()

type props = {
  signIn: function,
  forgotPassword: function,
  email: string,
  password: string,
}

type state = {}

class SignInScreen extends Component <props, state> {

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
            firebase.auth().createUserWithEmailAndPassword(email, password)
              .catch((error) => {
                Alert.alert(error.message),
                this.props.navigation.navigate('SignInScreen')
              }).then(
                this.props.signIn(),
                this.props.navigation.navigate('HomeScreen'))
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
      alert.alert("Please enter email address to send reset instructions to")
    }
  }

  renderLoader() {
    const { loginButtonArea, forgotPassword} = styles
    const { loading } = this.props

    if (loading) {
        return <Loader size="large"/>
    } else {
        return (
          <View>
            <SignInButton style={loginButtonArea}
              onPress={this.onSignInButtonPress.bind(this)}/>

            <Text style={forgotPassword}
              onPress={this.onForgotPassword.bind(this)} >
              Forgot Password?
            </Text>
          </View>
        )
      }
  }  

  render() {
    const { form, fieldStyles, loginButtonArea, forgotPassword, title } = styles

    return (
      <View style={form}>
        <Text style={title}>Login or create an account</Text>
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
  const { email, password } = state
  return ({ email, password })
}

export default connect(mapStateToProps, actions)(SignInScreen)