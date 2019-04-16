/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from './node_modules/react';
import {
  StyleSheet, 
  Text, 
  View
} from 'react-native';
import {MKTextField, MKColor, MKButton} from './node_modules/react-native-material-kit';
import { auth } from './node_modules/firebase';
import Loader from './loader';
import firebase from './node_modules/firebase';

const LoginButton = MKButton.coloredButton()
    .withText('LOGIN')
    .build();
const styles = StyleSheet.create({
    form: {
        paddingBottom: 10,
        width: 200,
    },
    fieldstyles: {
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
})
export default class Login extends Component {
  state = {
      email: '',
      password: '',
      error: ' ',
      loading: false,
  };
onButtonPress() {
    const {email, password} = this.state;
    this.setState({error: '', loading: true});
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onAuthSucess.bind(this))
      .catch(()=> {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onAuthSucess.bind(this))
          .catch(this.onAuthFailed.bind(this));
      });
}

onAuthSucess() {
  this.setState({
    email: '',
    password: '',
    error: ' ',
    loading: false,
  });
}
onAuthFailed() {
  this.setState({
    error: 'Authentication Failed not',
    loading: false,
  })
}
renderLoader() {
   if(this.state.loading) {
     return <Loader size="large"/>;
   } else {
     return  <LoginButton onPress = {this.onButtonPress.bind(this)}/>
   }
}
  render() {
      const {form, fieldstyles, loginButtonArea, errorMessage, welcome, container} = styles
    return (
      <View style={form}>
        <Text style={welcome}> Login or create an account</Text>
        <MKTextField
            Text = {this.state.email}
            onTextChange={email => this.setState({ email })}
            textInputStyle ={fieldstyles}
            placeholder={'Email...'}
            tintColor = {MKColor.Teal}
        />
        <MKTextField
            Text = {this.state.password}
            onTextChange={password => this.setState({ password })}
            textInputStyle ={fieldstyles}
            placeholder={'Password...'}
            tintColor = {MKColor.Teal}
            password = {true} // doesnt allow the password to show 
        />
        <Text style = {errorMessage}>
            {this.state.error}
        </Text>
        <View style = {loginButtonArea}>
           {this.renderLoader()}
        </View>
    </View>
    );
  }
}
