/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import ReactNative from 'react-native';
import * as firebase from 'firebase';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
import styles from './styles.js'
// const styles = require('./styles.js')

// Initialize firebase
const firebaseConfig = {
    apiKey: "AIzaSyB2E4QUnovDUJk9yBp4xlTrJVzBsbrW-ng",
    authDomain: "groceryapp-fda83.firebaseapp.com",
    databaseURL: "https://groceryapp-fda83.firebaseio.com/",
    storageBucket: "gs://groceryapp-fda83.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class GroceryApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
      itemsRef.on('value', (snap) => {

        // get children as an array
        var items = [];
        snap.forEach((child) => {
          items.push({
            title: child.val().title,
            _key: child.key
          });
        });

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items)
        });

      });
    }

  componentDidMount() {
    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza'}, { title: 'Burger' }])
    // })
    this.listenForItems(this.itemsRef);
  }

  _renderItem(item) {
    return (
      <ListItem item={item} onpress={null} />
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List" />

        <ListView
        datasource={this.state.dataSource}
        renderRow={this._renderItem.bind(this)}
        style={styles.listview}
        />

        <ActionButton title="Add" onpress={null} />

      </View>
    );
  }
}

AppRegistry.registerComponent('GroceryApp', () => GroceryApp);
