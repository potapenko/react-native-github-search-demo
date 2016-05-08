import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View
} from 'react-native';

import SearchBar from 'react-native-search-bar';
import RefreshInfiniteListView from '@remobile/react-native-refresh-infinite-listview';
import {Flexer, Spacer} from './utils.js';

class ReactNativeGithubSearchDemo extends Component {

  constructor(){
    super();
    this.getDataSource.bind(this);
  }

  getInitialState(){
    return {pos: 0, searchResult:[]}
  }

  onSearch(e) {
    console.log("on-search", e);
  }

  componentWillMount() {
    
  }

  getDataSource(){
    console.log("this.state >>> ", this, this.state)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(this.state.searchResult);
  }

  render() {
    return (

      <View style2={styles.container}>
        <Spacer height={30}/>
        <SearchBar
          ref='searchBar'
          placeholder='Search'
          onChangeText={this.onSearch}
        />
        <RefreshInfiniteListView 
          ref = {(list) => {this.list= list}}
          dataSource={this.getDataSource()}/>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  resultList: {
    flex: 1,
  }
});

AppRegistry.registerComponent('ReactNativeGithubSearchDemo', () => ReactNativeGithubSearchDemo);
