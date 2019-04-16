/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View
} from 'react-native';
import firebase from 'firebase';
import Login from './Login'
import PeopleList from './peopleList';
import Loader from './loader';
import {Provider} from 'react-redux';
import {createstore} from 'redux';
import reducers from '../reducers/PeopleReducers';

const store = createstore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class App extends Component {
  state = {
    LoggedIn : null
  };
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCfTpTjdk9clRF3_mBUzZG70Mmsyurr_5A",
      authDomain: "crmlinkedin-e51fa.firebaseapp.com",
      databaseURL: "https://crmlinkedin-e51fa.firebaseio.com",
      projectId: "crmlinkedin-e51fa",
      storageBucket: "crmlinkedin-e51fa.appspot.com",
      messagingSenderId: "350260326804"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {// if there is a user
        this.setState({ LoggedIn: true });
      } else {
        this.setState({LoggedIn: false});
      }
    });
  }
  renderInitialView() {
    switch(this.state.LoggedIn) {
      case true:
        return <PeopleList/>;
      case false:
        return <Login/>;
      default:
        return <Loader size="large" />;

    }
  }

  render() {
    return (
      <Provider store = {store}> 
        <View style={styles.container}>
          {this.renderInitialView()}
        </View>
      </Provider>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
