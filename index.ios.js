import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View
} from 'react-native';

import Router from 'react-native-simple-router';
import {SearchPage} from './search-page.js';
import {Flexer, Spacer} from './utils.js';

const firstRoute = {
  name: 'Home!',
  component: SearchPage,
  hideNavigationBar: true
};

class ReactNativeGithubSearchDemo extends Component {

  render() {
    return (

      <Router 
        style={[styles.container]}
        headerStyle={styles.header}
        firstRoute={firstRoute}>
      </Router>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    backgroundColor: "transparent"
  }
});

AppRegistry.registerComponent('ReactNativeGithubSearchDemo', () => ReactNativeGithubSearchDemo);
