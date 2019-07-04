import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import RNFS from  "react-native-fs";
import PopInButton from '../Components/PopInButton'

export default class FileStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: "",
      text: "",
      file: ""
    };
  }

  writeFile = () => {
    const {file} = this.state
    const fileName = file.includes(".txt") ? file : file + '.txt'
    const path = RNFS.DocumentDirectoryPath + "/" + fileName;
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
    const {file} = this.state
    const fileName = file.includes(".txt") ? file : file + '.txt'
    const path = RNFS.DocumentDirectoryPath + "/" + fileName;
    // get a list of files and directories in the main bundle
    RNFS.readFile(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        this.setState({ contents: result, error: "" });
      })

      .catch(err => {
        this.setState({ error: err.message });
        console.log(err.message, err.code);
      });
  };

  deleteFile = () => {
    const {file} = this.state
    const fileName = file.includes(".txt") ? file : file + '.txt'
    const path = RNFS.DocumentDirectoryPath + "/" + fileName;
    // delete a file
    RNFS.unlink(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
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
        <View style={{alignItems: 'center'}}>
          <Text>Enter the text you want to save.</Text>
          <Text>Then enter the name of the file to save it to.</Text>
          <Text>Delete will delete the entered file name if it exists.</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input}
            placeholder={"Text to save"}
            onChangeText={text => this.setState({ text })}
          />
          <TextInput
            placeholder={"File Name"}
            style={styles.input}
            onChangeText={text => this.setState({ file: text })}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <PopInButton style={styles.button} onPress={this.writeFile}>
            <Text style={styles.buttonText}>write</Text>
          </PopInButton>
          <PopInButton style={styles.button} onPress={this.readFile}>
            <Text style={styles.buttonText}>read</Text>
          </PopInButton>
          <PopInButton style={styles.buttonDelete} onPress={this.deleteFile}>
            <Text style={styles.buttonText}>delete</Text>
          </PopInButton>
        </View>
        <Text style={{ alignSelf: "center" }}>{this.state.contents}</Text>
        <Text style={{ flex: 0.2, alignSelf: "center", color: "red" }}>
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
    alignItems: "center",
    marginHorizontal: 20,
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
    margin: 10,
    borderRadius: 3,
  },
  buttonDelete: {
    backgroundColor: "red",
    padding: 10,
    margin: 10,
    borderRadius: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18
  }
};
