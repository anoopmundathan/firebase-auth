import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import firebase from 'firebase';
import { config } from './config'

export default class App extends React.Component {
  state = {
    email: '',
    password: '',
    loggedIn: ''
  }
  
  componentWillMount() {
    firebase.initializeApp(config)

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ loggedIn: 'In' });
      } else {
        this.setState({ loggedIn: 'Out' });
      }
    })

  }

  onLogin = () => {
    const { email, password } = this.state
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
      })
  }

  onCheckLogin = () => {
    const { user } = firebase.auth()
  }

  onSignOut = () => {
    firebase.auth().signOut()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.loggedIn}</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Your email!"
          onChangeText={(email) => this.setState({email})} />
          <TextInput
          style={{height: 40}}
          placeholder="Your Password!"
          onChangeText={(password) => this.setState({password})} />
        <Button
          onPress={this.onLogin}
          title="Login"
          color="#841584" />

          <Button
          onPress={this.onCheckLogin}
          title="Check Login"
          color="#841584" />

          <Button
          onPress={this.onSignOut}
          title="Sign Out"
          color="#841584" />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
