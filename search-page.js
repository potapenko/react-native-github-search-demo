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
import moment from 'momentjs';
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
      <TouchableHighlight onPress={e=>console.log("pressed")} style={[styles.item]} underlayColor="transparent">
        <View style={[styles.flex, styles.row]}>
          <Avatar url={data.owner.avatar_url}/>
          <Spacer width={10} />
          <View>
            <Spacer height={10} />
            <Text style={styles.resultTitle}>{data.full_name}</Text>
            <View style={styles.row}>
              <Stars style={styles.stars} stars={1}/>
              <Text style={styles.stars}>{data.stargazers_count}</Text>
              <Spacer width={20}/>
              <Text style={styles.stars}>{'Updated: ' + moment(data.updated_at).format("DD-MM-YYYY")}</Text>
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

    var buildSortStyles = (sortMode) => {
      if(sortMode == this.state.sortMode){
        return [styles.sortText, styles.underline];
      }else{
        return [styles.sortText];
      }
    }

    var setSortMode = (sortMode) => {
      this.setState({sortMode: sortMode});
      this.loadPage(0)
    }

    return (

      <View style={[styles.container]}>
        <SearchBar
          ref={(searchBar) => {this.searchBar= searchBar}}
          placeholder='Search'
          onChangeText={this.onSearch}
        />
        <View style={[styles.row, styles.sortPannel]}>
          <Text style={[styles.sortText]}>Sort By: </Text>
          <Spacer width={10}/>
          <TouchableHighlight onPress={e=> setSortMode("stars")} underlayColor="transparent">
            <Text style={buildSortStyles("stars")}>Stars</Text>
          </TouchableHighlight>
          <Spacer width={10}/>
          <TouchableHighlight onPress={e=> setSortMode("updated")} underlayColor="transparent">
            <Text style={buildSortStyles("updated")}>Last Update</Text>
          </TouchableHighlight>
        </View>
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
  sortPannel: {
    paddingTop: 8, 
    paddingLeft: 16, 
    opacity: 0.7,
  },
  sortText: {
    fontSize: 12,
  },
  underline: {
    textDecorationLine: "underline"
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

