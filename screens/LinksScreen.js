import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getRestaurantsAPI } from '../api/index'


export default class LinksScreen extends React.Component {
  state = {
    lat: 0,
    long: 0,
    cuisine: '',
    distance: '',
    listOfRestaurants: [],
    selectedRestaurant: '',
    errorMessage: ''
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
        this.setState({ lat : position.coords.latitude });
        this.setState({ long : position.coords.longitude });
      },
      error => this.setState({ errorMessage : error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  getRandomRestaurant = () => {
    getRestaurantsAPI(this.state.lat, this.state.long)
    .then(data => this.setState({listOfRestaurants: data.restaurants}))
    .then(() => {
        var randomNumber = Math.floor(Math.random() * this.state.listOfRestaurants.length);
        this.setState({selectedRestaurant: this.state.listOfRestaurants[randomNumber].restaurant.name})
      });
  }

  render() {

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Button title="Start" onPress={this.getRandomRestaurant}></Button>
        <Text>{this.state.selectedRestaurant}</Text>
        <Text>{this.state.errorMessage}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  }
});
