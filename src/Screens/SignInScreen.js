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
    }
})

const SignInButton = MKButton.coloredButton()
  .withText('SIGN IN')
  .build()

type props = {
  signIn: function,
  email: string,
  password: string,
}

type state = {}

class SignInScreen extends Component <props, state> {

  onButtonPress() {
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
    }}

  renderLoader() {
    const { loading } = this.props

    if (loading) {
        return <Loader size="large"/>;
    } else {
        return <SignInButton onPress={
            this.onButtonPress.bind(this)} />
      }
  }  

  render() {
    const { form, fieldStyles, loginButtonArea, title } = styles

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
        <View style={loginButtonArea}>
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