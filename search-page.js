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

export class SearchPage extends Component {

  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.updateDataSource = this.updateDataSource.bind(this);
    this.onInfinite = this.onInfinite.bind(this);
    this.loadedAllData = this.loadedAllData.bind(this);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    }
  }

  onSearch(e) {
    console.log("on refresh");
    setTimeout(() => {
      this.list.hideHeader();
      this.updateDataSource([]);
    }, 400);
  }

  updateDataSource(result) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({dataSource: ds.cloneWithRows(result)});
  }

  renderRow(data) {
    return <View><Text>{data}</Text></View>
  }

  renderEmptyRow() {
    return (
      <View style={styles.row}>
        <Flexer/>
        <View>
          <Spacer height={20}/>
          <Text style={{fontSize:12, color: "rgba(0,0,0,0.1)"}}>
            have no data
          </Text>
        </View>
        <Flexer/>
      </View>
    )
  }

  onInfinite() {
    console.log("on infinite");
  }

  loadedAllData() {
    return true;
  }

  render() {
    return (

      <View style={[styles.container]}>
        <SearchBar
          ref='searchBar'
          placeholder='Search'
          onChangeText={this.onSearch}
        />
        <RefreshInfiniteListView
          ref={(list) => {this.list= list}}
          style={[styles.flex]}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderEmptyRow={this.renderEmptyRow}
          onRefresh={this.onSearch}
          onInfinite={this.onInfinite}
          loadedAllData={this.loadedAllData}
        />
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
  resultList: {
    flex: 1,
  }
});

