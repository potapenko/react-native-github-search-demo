import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View
} from 'react-native';

import {Flexer, Spacer} from './utils.js';

export class DetailsPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    }
  }

  render() {
    return (

      <View style={[styles.container]}>
       
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  red: {
    backgroundColor: "red"
  },
  row: {
    flexDirection: "row"
  },
  flex: {
    flex: 1
  },
});

