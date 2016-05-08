import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';


export class Spacer extends Component {
    render() {
       return (<View style={{width: this.props.width || 1, height: this.props.height || 1}}/>)
    }
}
export class Flexer extends Component {
    render() {
        return (<View style={{flex: this.props.flex || 1}}/>)
    }
}