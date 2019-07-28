/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit'
import Loader from './Loader'
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

const resetButton = MKButton.coloredButton()
  .withText('RESET')
  .build()

type props = {
  changeEmail: function,
  changePassword: function,
  email: string,
  newEmail: String,
  password: string,
  newPassword: string
}

type state = {}

class EmailPasswordResetScreen extends Component <props, state> {

  onButtonPress() {
    const { email, password, newEmail, newPassword } = this.props

    if (newPassword) {
      this.props.changePassword(),
      this.props.navigation.navigate('HomeScreen')

    }

    if (newEmail) {
      this.props.changeEmail(),
      this.props.navigation.navigate('HomeScreen')

    }

  }


  renderLoader() {
    const { loading } = this.props

    if (loading) {
        return <Loader size="large"/>;
    } else {
        return <resetButton onPress={
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
          placeholder={'New Household Email....'}
          tintColor={MKColor.Teal}
          value={this.props.newEmail}
          onChangeText={value =>
            this.props.formUpdate({ prop: 'email', value })}
        />

        <MKTextField
          textInputStyle={fieldStyles}
          placeholder={'New Password....'}
          tintColor={MKColor.Teal}
          value={this.props.newPassword}
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
  const { newEmail, newPassword } = state
  return ({ newEmail, newPassword })
}

export default connect(mapStateToProps, actions)(EmailPasswordResetScreen)