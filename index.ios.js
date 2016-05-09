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
  name: 'Github Search',
  component: SearchPage,
  hideNavigationBar: true,
};

class BackButtonComponent extends Component {

  render() {
    return (

      <View style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </View>

    );
  }
}

class ReactNativeGithubSearchDemo extends Component {

  render() {
    return (

      <Router 
        style={[styles.container]}
        headerStyle={styles.header}
        firstRoute={firstRoute}
        backButtonComponent={BackButtonComponent}>
      </Router>

    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: 4,
    marginLeft: 16,
    width: 80
  },
  backButtonText: {
    fontSize: 15,
    color: "white",
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "skyblue",
  },

});

AppRegistry.registerComponent('ReactNativeGithubSearchDemo', () => ReactNativeGithubSearchDemo);
