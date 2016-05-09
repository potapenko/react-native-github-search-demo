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
import {Flexer, Spacer, Avatar, Stars, LoadingIndicator, lazyCall} from './utils.js';
import {DetailsPage} from './details-page.js';

const detailsRoute = {
  name: 'Details',
  component: DetailsPage,
};

export class SearchPage extends Component {

  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.buildDataSource = this.buildDataSource.bind(this);
    this.onInfinite = this.onInfinite.bind(this);
    this.loadedAllData = this.loadedAllData.bind(this);
    this.openDetails = this.openDetails.bind(this);

    this.state = {searchString: "", sortMode: "stars", currentPage: 1, pages: [], dataSource: this.buildDataSource([])};
  }


  onSearch(searchString) {
    this.setState({pages: [], currentPage:1, loading: !!searchString, searchString: searchString, dataSource: this.buildDataSource([])});
    lazyCall(()=> {this.loadPage(1)})
  }

  onRefresh(){
    this.setState({pages: [], currentPage:1, loading: true, dataSource: this.buildDataSource([])});
    lazyCall(()=> {this.loadPage(1)}, 200)
  }

  loadPage(pageNumber){
    this.setState({currentPage: pageNumber});
    fetch(`https://api.github.com/search/repositories?q=${this.state.searchString}&page=${pageNumber}&sort=${this.state.sortMode}&order=desc&r=${Math.random()}`)
      .then((response) => response.json())
      .then((json) => {
        this.list.hideHeader();
        var pages = this.state.pages;
        if(pageNumber == 1){
          pages = [json.items];
        }else{
          pages[pageNumber] = json.items;
        }
        var result = [];
        pages.filter(e => !!e).forEach(e => result = [...result, ...e]);
        console.log((json.items && json.items.length), ":new list size: ", result.length, ", pages: ", pages.length)
        if(!json.items){
          console.log("error loading items: ", json);
          this.setState({loading:false});
        }else{
          this.setState({pages: pages, loading:false, dataSource: this.buildDataSource(result)});
        }
      })
      .catch((error) => {
        console.warn("error:", error);
      });
  }

  buildDataSource(result) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    return ds.cloneWithRows(result);
  }

  openDetails(data){
    this.props.toRoute(Object.assign(detailsRoute, {data: data}))
  }

  // <Text style={styles.resultTitle}> <Text style={styles.resultRepositori}>{data.owner.login}</Text>/{data.name}</Text>

  renderRow(data) {
    return (
      <TouchableHighlight onPress={e=>this.openDetails(data)} style={[styles.item]} underlayColor="transparent">
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
        
      </Text>
    )
  }

  renderHeaderRefreshing(){
    return (
      <View/>
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
    
    var loader = null;

    if(this.state.loading){
      loader = <LoadingIndicator/>
    }

    return (


      <View style={[styles.container]}>
        <View style={[styles.shadow]}>
          <SearchBar
            ref={(searchBar) => {this.searchBar= searchBar}}
            placeholder='Github Search'
            barTintColor="skyblue"
            onChangeText={this.onSearch}
          />
        </View>
        <Spacer height={12}/>
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
        <Spacer height={8}/>
        {loader}
        <RefreshInfiniteListView
          ref={(list) => {this.list= list}}
          style={[styles.flex]}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderEmptyRow={this.renderEmptyRow}
          onRefresh={this.onRefresh}
          onInfinite={this.onInfinite}
          loadedAllData={this.loadedAllData}
          renderHeaderRefreshing={this.renderHeaderRefreshing}
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
  resultRepositori: {
    fontSize: 12,
    fontWeight: "bold"
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
  },
  shadow: {
    // borderRadius: 10,
    // shadowColor: "black",
    // shadowOpacity: 0.8,
    // shadowRadius: 12,
    // shadowOffset: {
    //   hight: 1,
    //   width: 0,
    // }
  }
});

