import React, { Component } from 'react';
import { View, Alert,Text, UIManager, LayoutAnimation, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { authorize, refresh, revoke } from 'react-native-app-auth';
var jwtDecode = require('jwt-decode');
import {WebView} from 'react-native-webview'

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const config = {
  issuer: 'https://dev-122408.okta.com/oauth2/default',
  clientId: '0oanbifcoDQXP4ezA356',
  redirectUrl: 'com.okta.dev-122408:/callback',
  scopes: ['openid', 'profile', 'email', 'offline_access']
};

export default class Auth extends Component {
  state = {
    hasLoggedInOnce: false,
    accessToken: '',
    accessTokenExpirationDate: '',
    refreshToken: '',
    uid: '',
    modalVisible: false,
    uri: 'https://dev-122408.okta.com/oauth2/default/v1/authorize?client_id=' + config.clientId + '&response_type=code&scope=openid+email+profile&redirect_uri=https://www.google.com&nonce=g5ly497e8ps&state=dfasdfasdf&code_challenge=S256&code_challenge_method=S256&response_mode=query'
  };

  animateState(nextState, delay =  0) {
    setTimeout(() => {
      this.setState(() => {
        LayoutAnimation.easeInEaseOut();
        return nextState;
      });
    }, delay);
  }

  authorize = async () => {
    try {
      const authState = await authorize(config);
      var decoded = jwtDecode(authState.accessToken);
      this.animateState(
        {
          hasLoggedInOnce: true,
          uid: decoded.uid,
          idToken: authState.idToken,
          accessToken: authState.accessToken,
          accessTokenExpirationDate: authState.accessTokenExpirationDate,
          refreshToken: authState.refreshToken
        },
        500
      );
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
    }
  };

  refresh = async () => {
    try {
      const authState = await refresh(config, {
        refreshToken: this.state.refreshToken
      });

      this.animateState({
        accessToken: authState.accessToken || this.state.accessToken,
        accessTokenExpirationDate:
        authState.accessTokenExpirationDate || this.state.accessTokenExpirationDate,
        refreshToken: authState.refreshToken || this.state.refreshToken
      });
    } catch (error) {
      Alert.alert('Failed to refresh token', error.message);
    }
  };

  revoke = async () => {
    try {
      await revoke(config, {
        tokenToRevoke: this.state.refreshToken,
        sendClientId: true
      });
      this.animateState({
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: '',
        uid: '',
        idToken: ''
      });
    } catch (error) {
      Alert.alert('Failed to revoke token', error.message);
    }
  };

  setModalVisible(visible) {
    console.log(this.state.uri)
    this.setState({modalVisible: visible});
  }

  print = (syntheticEvent) => {
    const {nativeEvent} = syntheticEvent;
    console.log(nativeEvent)
  }

  render() {
    const {state} = this;
    return (
      <View style={styles.container}>
        {!!state.accessToken ? (
          <View style={styles.textContainer}>
            <Text style={styles.title}>accessToken</Text>
            <Text>{state.accessToken}</Text>
            <Text style={styles.title}>accessTokenExpirationDate</Text>
            <Text>{state.accessTokenExpirationDate}</Text>
            <Text style={styles.title}>refreshToken</Text>
            <Text>{state.refreshToken}</Text>
          </View>
        ) : (
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>{state.hasLoggedInOnce ? 'Goodbye.' : 'Hello, stranger.'}</Text>
          </View>
        )}

          <View style={styles.buttonContainer}>
          {!state.accessToken && (
            <TouchableOpacity 
              style={styles.button}
              onPress={this.authorize}>
              <Text style={styles.buttonText}>Authorize</Text>
            </TouchableOpacity>
          )}
          </View>

          <View style={styles.refreshContainer}>
            {!!state.refreshToken && 
              <TouchableOpacity 
                style={[styles.button, {backgroundColor: '#24C2CB'}]}
                onPress={this.refresh}>
                <Text style={styles.buttonText}>Refresh</Text>
              </TouchableOpacity>}
              {!!state.accessToken && 
              <TouchableOpacity
              style={[styles.button, {backgroundColor: '#EF525B'}]}
              onPress={this.revoke}>
                <Text style={styles.buttonText}>Revoke</Text>
              </TouchableOpacity>}
          </View>

          <View>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <SafeAreaView style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text style={{fontSize: 20, marginLeft: 20}}>X</Text>
                  </TouchableOpacity>
                  <WebView
                    allowsLinkPreview
                    allowsBackForwardNavigationGestures
                    onError={this.print}
                    onLoad={this.print}
                    source={{ uri: this.state.uri }}
                    style={{ flex: 1 }}
                  />
                </SafeAreaView>
              </Modal>

              <TouchableOpacity
                underlayColor={'#ddd'}
                onPress={() => {
                    this.setModalVisible(true);
                }}>
                <Text>WebView</Text>
              </TouchableOpacity>
            </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    margin: 10
  },
  title: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: '40%',
    paddingVertical: 15,
    backgroundColor: '#017CC0',
    alignItems: 'center',
  },
  refreshContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white'
  },
  textContainer: {
    flex: 1,
    marginBottom: 10
  },
  greetingContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  greeting: {
    fontSize: 36,
    fontWeight: '200'
  }
}