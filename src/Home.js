import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Webview from './Webview'

export default class Home extends Component {
  static navigationOptions = () => {
    return {
      title: 'Home',
    }
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  navigate = (path) => {
    this.props.navigation.navigate(path)
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={()=> this.navigate('EmailFormatVerify')}>
          <Text>EmailFormatVerify</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> this.navigate('FileStream')}>
          <Text>FileStream</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> this.navigate('Camera')}>
          <Text>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> this.navigate('Auth')}>
          <Text>Auth</Text>
        </TouchableOpacity>
        <Webview source={'https://www.google.com'}/>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'space-around',
  }
}
