import React, { Component } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { WebView } from "react-native-webview";

export default class Webview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onLoad = syntheticEvent => {
    const { nativeEvent } = syntheticEvent;
    console.log(nativeEvent);
  };

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Text style={{ fontSize: 20, marginLeft: 20 }}>X</Text>
            </TouchableOpacity>
            <WebView
              allowsLinkPreview
              allowsBackForwardNavigationGestures
              onLoad={this.onLoad}
              source={{ uri: this.props.source }}
              style={{ flex: 1 }}
            />
          </SafeAreaView>
        </Modal>

        <TouchableOpacity
          underlayColor={"#ddd"}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>WebView</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
