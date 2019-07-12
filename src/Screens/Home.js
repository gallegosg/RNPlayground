import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions} from 'react-native';
import PopInButton from '../Components/PopInButton';
import {backgroundColor} from '../styles'
const {width} = Dimensions.get('screen');

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [
        {
          name: 'Verify Email',
          screen: 'EmailFormatVerify',
          tileColor: '#ededed'
        },
        {
          name: 'File Stream',
          screen: 'FileStream',
          tileColor: '#ddd'
        },
        {
          name: 'Camera',
          screen: 'Camera',
          tileColor: '#dedede'
        },
        {
          name: 'Auth',
          screen: 'Auth',
          tileColor: '#eee'
        },
        {
          name: 'Web View',
          screen: 'WebView',
          tileColor: '#eee'
        },
        {
          name: 'Masonry',
          screen: 'Masonry',
          tileColor: '#ddd'
        }
      ]
    };
  }

  navigate = (path) => {
    this.props.navigation.navigate(path)
  }
  
  renderTile = ({item}) => {
    return(
      <PopInButton
        style={[styles.tileContainer, {backgroundColor: item.tileColor}]}
        onPress={()=> this.navigate(item.screen)}>
        <Text style={styles.tileText}>{item.name}</Text>
      </PopInButton>
  )}

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
          horizontal={false}
          numColumns={2}
          data={this.state.tiles}
          renderItem={this.renderTile}
          keyExtractor={(item, index) => index.toString()} />
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor,
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  listContainer: {
    flex: 1, 
    margin: 10,
  },
  tileContainer: {
    margin: 10,
    width: width / 2.4,
    height: width / 3,
    backgroundColor: '#c1d9ff',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  tileText: {
    fontSize: 18,
    color: '#333'
  }
}
