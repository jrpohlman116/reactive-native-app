import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
  state = {
    count: 0,
    isIncrementing: true,
    symbol: '+'
  };

  toggleSwitch = (value) => {
    this.setState({isIncrementing : value});

    if (!this.state.isIncrementing){
      this.setState({symbol : '+'});
    } else {
      this.setState({symbol : '-'});
    }

  }

  incrementOrDecrement = () => {
    var value = this.state.isIncrementing ? 1 : -1;
    this.setState({count : this.state.count + value });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.countText}>{this.state.count}</Text>
          <Switch
            onValueChange = {this.toggleSwitch}
            value = {this.state.isIncrementing}
          ></Switch>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.floatingActionButton}
            onPress={this.incrementOrDecrement}
          >
            <Text style={styles.fabText}>{this.state.symbol}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 50
  },
  countText: {
    fontSize: 72
  },
  fabText: {
    fontSize: 25,
    color: '#ffffff'
  },
  floatingActionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#005F9E',
    padding: 10
  },
  bottom: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    margin: 36,
  }
});
