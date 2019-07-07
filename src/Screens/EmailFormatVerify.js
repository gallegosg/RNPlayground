import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default class EmailFormatVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      email: ""
    };
  }

  /**
   * run the entered email through an email checking regex
   */
  verifyEmail = () => {
    const { email } = this.state;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+([a-zA-Z]{2,})))$/;

    if (emailRegex.test(email.trim())) {
      this.setState({ message: "Success", color: "green" });
    } else {
      this.setState({ message: "Fail", color: "red" });
    }
  };
  
  render() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <View style={{alignItems: 'center'}}>
          <Text>Enter an email address and hit Verify</Text>
        </View>
        <TextInput
          onFocus={() => this.setState({ message: "" })}
          placeholder={"email"}
          style={styles.textInput}
          onEndEditing={this.verifyEmail}
          onChangeText={text => this.setState({ email: text })}
        />
        <TouchableOpacity onPress={this.verifyEmail}>
          <Text style={{ color: "#444", fontSize: 20 }}>Verify</Text>
        </TouchableOpacity>
        <View style={styles.statusContainer}>
          <Text
            style={[styles.statusText, { color: this.state.color}]}
          >
            {this.state.message}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  textInput: {
    borderWidth: 2,
    width: '80%',
    margin: 20,
    padding: 5,
    borderColor: "#666",
    borderWidth: 1,
    borderRadius: 5,
  },
  statusContainer: {
    flex: 0.4,
    justifyContent: 'flex-end'
  },
  statusText: {
    fontSize: 50,
    fontWeight: "bold",
    margin: 20
  }
}
