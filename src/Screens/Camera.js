import React, { Component } from 'react';
import { View, Text, Image, Dimensions, Animated } from 'react-native';
import ImagePicker from 'react-native-image-picker'
import PopInButton from '../Components/PopInButton';
const { width } = Dimensions.get('screen')

export default class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadAvatar: '',
      avatarSource: null
    };
  }

  componentWillMount = () => {
    this.animatedBackgroundColor = new Animated.Value(1);
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
        }, () => {
          Animated.timing(this.animatedBackgroundColor, {
            toValue: 150,
            duration: 1000
          }).start();
        });
      }
    })
  }
  removePhoto = () => {
    this.setState({
      avatarSource: null,
    }, () => {
      Animated.timing(this.animatedBackgroundColor, {
        toValue: 150,
        duration: 1000
      }).start();
    });
  }

  render() {
    const isShowingPhoto = this.state.avatarSource;

    const whiteToBlack = this.animatedBackgroundColor.interpolate({
      inputRange: [0, 150],
      outputRange: ['rgb(255,255,255)', 'rgb(0, 0, 0)']
    })

    const blackToWhite = this.animatedBackgroundColor.interpolate({
      inputRange: [0, 150],
      outputRange: ['rgb(0, 0, 0)', 'rgb(255, 255, 255)']
    })

    return (
      <Animated.View style={[styles.container, {backgroundColor: isShowingPhoto ? blackToWhite : whiteToBlack}]}>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: '#fff'}}>Hit Camera to take a picture or open the image picker</Text>
        </View>
        {!!this.state.avatarSource &&
          <Image
            source={this.state.avatarSource}
            resizeMode={'contain'}
            style={styles.uploadAvatar} />
        }
        <View style={{flex: 0.1, justifyContent: 'space-around', flexDirection: 'row', width: '100%'}}>
          <PopInButton style={[styles.buttonContainer, {backgroundColor: isShowingPhoto ? whiteToBlack : blackToWhite}]} onPress={this.openImagePicker}>
              <Text style={styles.text}>Camera</Text>
          </PopInButton>
          <PopInButton style={styles.buttonContainer} onPress={this.removePhoto}>
              <Text style={styles.text}>remove</Text>
          </PopInButton>
        </View>
        
      </Animated.View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10
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
    width: '40%',
    height: '80%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
}
