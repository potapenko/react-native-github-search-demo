import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import SearchBar from 'react-native-search-bar';
import RefreshInfiniteListView from '@remobile/react-native-refresh-infinite-listview';
import {Flexer, Spacer, Avatar, Stars} from './utils.js';

export class SearchPage extends Component {

  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.buildDataSource = this.buildDataSource.bind(this);
    this.onInfinite = this.onInfinite.bind(this);
    this.loadedAllData = this.loadedAllData.bind(this);

    this.state = {searchString: "", sortMode: "stars", currentPage: 1, pages: [], dataSource: this.buildDataSource([])};
  }


  onSearch(searchString) {
    // sort mode - stars or updated
    this.setState({currentPage:1, searchString: searchString, dataSource: this.buildDataSource([])});
    this.loadPage(1);
  }

  onRefresh(){
    this.setState({currentPage:1, dataSource: this.buildDataSource([])});
    this.loadPage(1);
  }

  loadPage(loadPage){
    this.setState({currentPage: loadPage});
    fetch(`https://api.github.com/search/repositories?q=${this.state.searchString}&page=${loadPage}&sort=${this.state.sortMode}&order=desc`)
      .then((response) => response.json())
      .then((json) => {
        this.list.hideHeader();
        var pages = this.state.pages;
        if(loadPage == 1){
          pages = [json.items];
        }else{
          pages[loadPage] = json.items;
        }
        var result = [];
        pages.filter(e => !!e).forEach(e => result = [...result, ...e]);
        this.setState({pages: pages, dataSource: this.buildDataSource(result)});
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  buildDataSource(result) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    return ds.cloneWithRows(result);
  }

  renderRow(data) {
    return (
      <TouchableHighlight style={[styles.item]} underlayColor="transparent">
        <View style={[styles.flex, styles.row]}>
          <Avatar url={data.owner.avatar_url}/>
          <Spacer width={10} />
          <View>
            <Spacer height={10} />
            <Text style={styles.resultTitle}>{data.full_name}</Text>
            <View style={styles.row}>
              <Stars style={styles.stars} stars={1}/>
              <Text style={styles.stars}>{data.stargazers_count}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
      );
  }

  renderEmptyRow() {
    return (
      <Text style={styles.empty}>
        have no data
      </Text>
    )
  }

  onInfinite() {
    console.log("onInfinite: ", this.state.currentPage);
    this.loadPage(this.state.currentPage+1);
  }

  loadedAllData() {
    return false;
  }

  render() {
    return (

      <View style={[styles.container]}>
        <SearchBar
          ref={(searchBar) => {this.searchBar= searchBar}}
          placeholder='Search'
          onChangeText={this.onSearch}
        />
        <RefreshInfiniteListView
          ref={(list) => {this.list= list}}
          style={[styles.flex]}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderEmptyRow={this.renderEmptyRow}
          onRefresh={this.onRefresh}
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
  item: {
    paddingTop: 16,
    paddingLeft: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "200"
  },
  stars: {
    opacity: 0.7,
    color: "gray"
  },
  empty: {
    color: "rgba(0,0,0,0.1)",
    textAlign: "center",
    padding: 8
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
  overlay: {
    overflow: 'hidden',
  },
  resultList: {
    flex: 1,
  }
});

