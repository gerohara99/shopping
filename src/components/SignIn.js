/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import Loader from './Loader';
import firebase from 'firebase';

const SignInButton = MKButton.coloredButton()
    .withText('SIGN IN')
    .build();

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
    errorMessage: {
        marginTop: 15,
        fontSize: 15,
        color: 'red',
        alignSelf: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
    },
});

type props = {}

type state = {
    email: string,
    password: string,
    error: string,
    loading: boolean,
}

export default class SignOut extends Component <props, state> {
  state = {
      email: '',
      password: '',
      error: '',
      loading: false,
  };

  onButtonPress() {
      const { email, password } = this.state;
      this.setState({error: '', loading: true});

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onAuthSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onAuthSuccess.bind(this))
                .catch(this.onAuthFailed.bind(this));
        });
  }

  onAuthSuccess() {
      this.setState({
        email: '',
        password: '',
        error: '',
        loading: false,
      });
  }

onAuthFailed() {
    this.setState({
        error: 'Authentication Failed',
        loading: false,
    });
}

  renderLoader() {
    if (this.state.loading) {
        return <Loader size="large"/>;
    } else {
        return <SignInButton onPress={this.onButtonPress.bind(this)} />
    }
  }

  render() {
    const { form, fieldStyles, loginButtonArea, errorMessage } = styles;
    return (
      <View style={form}>
        <Text style={styles.title}>Login or create an account</Text>
        <MKTextField
            text={this.state.email}
            onTextChange={email => this.setState({ email })}
            textInputStyle={fieldStyles}
            placeholder={'Email...'}
            tintColor={MKColor.Teal}
        />
        <MKTextField
            text={this.state.password}
            onTextChange={password => this.setState({ password })}
            textInputStyle={fieldStyles}
            placeholder={'Password...'}
            tintColor={MKColor.Teal}
            password={true}
        />
        <Text style={errorMessage}>
            {this.state.error}
        </Text>
        <View style={loginButtonArea}>
            {this.renderLoader()}
        </View>
      </View>
    );
  }
}