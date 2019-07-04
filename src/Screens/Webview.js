import React, { Component } from "react";
import {
  View,
} from "react-native";
import { WebView } from "react-native-webview";

export default class Webview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  onLoad = syntheticEvent => {
    const { nativeEvent } = syntheticEvent;
    console.log(nativeEvent);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          allowsLinkPreview
          allowsBackForwardNavigationGestures
          onLoad={this.onLoad}
          source={{ uri: 'https://www.google.com'}}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}
