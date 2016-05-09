import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  ScrollView,
  Text,
  View
} from 'react-native';

import {Flexer, Spacer, Avatar, Stars, OpenURLButton} from './utils.js';
import moment from 'momentjs';

export class DetailsPage extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    var data = this.props.data;

    return (

      <ScrollView style={[styles.container]}>
        <Avatar url={data.owner.avatar_url}/>
        <Spacer height={20}/> 
        <Text style={styles.resultTitle}>{data.full_name}</Text>
        <Spacer height={5}/>
        <View style={styles.row}>
          <Stars style={styles.stars} stars={1}/>
          <Text style={styles.stars}>{data.stargazers_count}</Text>
          <Spacer width={20}/>
          <Text style={styles.stars}>{'Updated: ' + moment(data.updated_at).format("DD-MM-YYYY")}</Text>
          <Spacer width={20}/>
          <Text style={styles.stars}>{'Forks: ' + data.forks}</Text>
        </View>
        <Spacer height={15}/>
        <Text style={styles.description}>{data.description}</Text>
        <Spacer height={15}/>
        <OpenURLButton url={data.html_url}/>
      </ScrollView>

      );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  resultTitle: {
    fontSize: 20,
    fontWeight: "200"
  },
  resultRepositori: {
    fontSize: 12,
    fontWeight: "bold"
  },
  description: {
    fontSize: 18,
    fontWeight: "200"
  },
  stars: {
    opacity: 0.7,
    color: "gray"
  },
});

