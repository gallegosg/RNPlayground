import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Masonry from 'react-native-masonry';
import Axios from 'axios';

export default class Masonree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bricks: []
    };
  }

  componentWillMount = () => this.getBricks();

  /**
   * Generate list of ranom images
   * currently does not generate random images, but many duplicates
   */
  getBricks = () => {
    let bricks = []
    for(let i = 0; i < 50; i++){
      bricks.push({
        key: i,
        uri: 'https://source.unsplash.com/random'
      })
    }
    this.setState({bricks})
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Masonry
          columns={3}
          bricks={this.state.bricks}
        />
      </View>
    );
  }
}
