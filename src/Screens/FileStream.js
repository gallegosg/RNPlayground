import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import RNFS from  "react-native-fs";
import PopInButton from '../Components/PopInButton'
import { backgroundColor } from '../styles'

export default class FileStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: "",
      text: "",
      file: ""
    };
  }

  /**
   * take text in input text box and save to
   * file in file name input box
   */
  writeFile = () => {
    const {file} = this.state
    const fileName = file.includes(".txt") ? file : file + '.txt'
    const path = RNFS.DocumentDirectoryPath + "/" + fileName;
    // write the file
    RNFS.writeFile(path, this.state.text, "utf8")
      .then(() => {
        this.setState({ contents: 'Success', error: "" });
      })
      .catch(err => {
        this.setState({ contents: '', error: err.message });
        console.log(err.message);
      });
  };

  /**
   * Read file entered in file name input
   */
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

  /**
   * Delete the file entered in the file name input
   */
  deleteFile = () => {
    const {file} = this.state
    const fileName = file.includes(".txt") ? file : file + '.txt'
    const path = RNFS.DocumentDirectoryPath + "/" + fileName;
    // delete a file
    RNFS.unlink(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        this.setState({ contents: 'Deleted', error: "" });
      })

      .catch(err => {
        this.setState({ contents: '', error: err.message });
        console.log(err.message, err.code);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: '#333', fontSize: 16}}>
            <Text>1. Enter the text you want to save.{"\n"}</Text>
            <Text>2. Then enter the name of the file to save it to.{"\n"}</Text>
            <Text>3. Delete will delete the entered file name if it exists.{"\n"}</Text>
          </Text>
        </View>
        <View style={{ alignItems: "center", width: '100%' }}>
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
            <Text style={[styles.buttonText, {color: '#eee'}]}>delete</Text>
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
    backgroundColor,
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    width: "100%",
    borderColor: '#555',
    borderRadius: 5,
    padding: 10,
    margin: 10
  },
  button: {
    backgroundColor: "#fff",
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
    color: "#333",
    fontSize: 18
  }
};
