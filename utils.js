import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Linking,
    TouchableHighlight
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
export class Avatar extends Component {
    render() {
        return (<View style={[styles.overlay, styles.avatar]}>
                    <Image source={{uri: this.props.url}} style={[styles.image]} />
                </View>)
    }
}

export class Stars extends Component {
    render() {
        var stars = "★";
        var count = this.props.stars || 1;
        while(--count > 0)stars+="★";
        return <Text style={[styles.stars, this.props.style]}>{stars}</Text>
    }
}


export class OpenURLButton extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(url) {
        Linking.canOpenURL(this.props.url).then(supported => {
          if (supported) {
            Linking.openURL(this.props.url);
        } else {
            console.log('Don\'t know how to open URI: ' + this.props.url);
        }
    });
    }

render() {
    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.handleClick}>
          <View style={styles.button}>
            <Text style={styles.stars}>{this.props.url}</Text>
          </View>
      </TouchableHighlight>
      );
}
}


const styles = StyleSheet.create({
    overlay: {
        overflow: 'hidden',
    },
    avatar: {
      borderRadius: 30,
      width: 60, 
      height: 60,
    },
    image: {
      flex: 1,
    },
    stars: {
      opacity: 0.5,
      color: "gray"
    }
});