import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker'
const { width } = Dimensions.get('screen')

export default class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadAvatar: ''
    };
  }

  openImagePicker = () => {
    const options = {
      title: 'Select Image',
      quality: 1,
      allowsEditing: true,
      mediaType: 'photo'
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ',  response)

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text>Hit Camera to take a picture or open the image picker</Text>
        </View>
        <Image
          source={this.state.avatarSource}
          resizeMode={'contain'}
          style={styles.uploadAvatar} />
        <TouchableOpacity style={styles.textContainer} onPress={this.openImagePicker}>
          <View style={styles.buttonContainer}>
            <Text style={styles.text}>Camera</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10
  },
  uploadAvatar: {
    flex: 0.8,
    width: width * 0.9
  },
  textContainer: {
    flex: 0.2,
  },
  text: {
    fontSize: 26,
    color: '#000'
  },
  buttonContainer: {
    backgroundColor: '#c1d9ff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  }
}
