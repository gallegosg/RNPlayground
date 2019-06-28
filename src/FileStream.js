import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import RNFS from  "react-native-fs";

export default class FileStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: "",
      text: "",
      path: ""
    };
  }

  writeFile = () => {
    const path = RNFS.DocumentDirectoryPath + "/" + this.state.path;
    // write the file
    RNFS.writeFile(path, this.state.text, "utf8")
      .then(success => {
        console.log("FILE WRITTEN!");
        this.setState({ error: "" });
      })
      .catch(err => {
        this.setState({ error: err.message });
        console.log(err.message);
      });
  };

  readFile = () => {
    const path = RNFS.DocumentDirectoryPath + "/" + this.state.path;
    // get a list of files and directories in the main bundle
    RNFS.readFile(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        console.log("GOT RESULT", result);

        this.setState({ contents: result, error: "" });
      })

      .catch(err => {
        this.setState({ error: err.message });
        console.log(err.message, err.code);
      });
  };

  deleteFile = () => {
    const path = RNFS.DocumentDirectoryPath + "/" + this.state.path;
    // delete a file
    RNFS.unlink(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        console.log("GOT RESULT", result);

        this.setState({ contents: '', error: "" });
      })

      .catch(err => {
        this.setState({ error: err.message });
        console.log(err.message, err.code);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input}
            placeholder={"Text to save"}
            onChangeText={text => this.setState({ text })}
          />
          <TextInput
            placeholder={"File Name"}
            style={styles.input}
            onChangeText={text => this.setState({ path: text })}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity style={styles.button} onPress={this.writeFile}>
            <Text style={styles.buttonText}>write</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.readFile}>
            <Text style={styles.buttonText}>read</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDelete} onPress={this.deleteFile}>
            <Text style={styles.buttonText}>delete</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ alignSelf: "center" }}>{this.state.contents}</Text>
        <Text style={{ alignSelf: "center", color: "red" }}>
          {this.state.error}
        </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  input: {
    borderWidth: 1,
    width: "100%",
    padding: 10,
    margin: 10
  },
  button: {
    backgroundColor: "teal",
    padding: 10,
    margin: 10
  },
  buttonDelete: {
    backgroundColor: "red",
    padding: 10,
    margin: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 18
  }
};
