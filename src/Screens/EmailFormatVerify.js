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
          <Text>Enter an email address and hit verify</Text>
        </View>
        <TextInput
          onFocus={() => this.setState({ message: "" })}
          placeholder={"email"}
          style={{
            borderWidth: 2,
            width: 250,
            margin: 20,
            padding: 5,
            borderColor: "#666"
          }}
          onEndEditing={this.verifyEmail}
          onChangeText={text => this.setState({ email: text })}
        />
        <TouchableOpacity onPress={this.verifyEmail}>
          <Text style={{ color: "#444", fontSize: 20 }}>Verify</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 50,
            fontWeight: "bold",
            color: this.state.color,
            margin: 20
          }}
        >
          {this.state.message}
        </Text>
      </View>
    );
  }
}
