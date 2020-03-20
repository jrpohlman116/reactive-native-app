import * as React from 'react';
import { StyleSheet, Text, Picker, View, Image, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getRestaurantsAPI, getCityAPI, getCuisinesAPI } from '../api/index';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class GenerateRandomRestuarant extends React.Component {
  state = {
    lat: 0,
    long: 0,
    cuisine: '',
    distance: '',
    listOfRestaurants: [],
    listOfCuisine: [],
    oldCuisine: '',
    selectedCuisine: '',
    selectedRestaurant: null,
    errorMessage: '',
    clicks: 0
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)

        getCityAPI(position.coords.latitude, position.coords.longitude)
        .then(data => {
          return getCuisinesAPI(data.location_suggestions[0].id)
        })
        .then(data => {
          var listOfCuisine= [];
          listOfCuisine.push({'cuisine_id': 0, 'cuisine_name': 'Any'});
          for (var i = 0; i < data.cuisines.length; i++) {
            listOfCuisine.push(data.cuisines[i].cuisine);
          }
          this.setState({ selectedCuisine : listOfCuisine[0] });
          this.setState({ listOfCuisine });
        })
        .then(() => {
          this.getListOfRestuarants(this.state.lat, this.state.long, this.state.selectedCuisine);
        });

        this.setState({ lat : position.coords.latitude });
        this.setState({ long : position.coords.longitude });
      },
      error => this.setState({ errorMessage : error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  getListOfRestuarants = (lat, long, selectedCuisine) => {
    console.log('Old' + this.state.oldCuisine)
    console.log('Selected' + this.state.selectedCuisine)
    if (this.state.listOfRestaurants.length == 0 || (this.state.oldCuisine != '' && this.state.oldCuisine != this.state.selectedCuisine)){
      return getRestaurantsAPI(lat, long, selectedCuisine.cuisine_id)
      .then(data => this.setState({listOfRestaurants: data.restaurants}))
      .then(() => console.log("List Constructed"))
    } else {
      this.setState({oldCuisine : this.state.selectedCuisine})
      return new Promise.resolve();
    }
  }

  getRandomRestaurant = () => {
   this.getListOfRestuarants(this.state.lat, this.state.long, this.state.selectedCuisine)
   .then(() => {
      console.log('Generate Random Number')
      var randomNumber = Math.floor(Math.random() * this.state.listOfRestaurants.length);
      this.setState({selectedRestaurant: this.state.listOfRestaurants[randomNumber].restaurant})
      this.setState({clicks: this.state.clicks + 1});
    }).then(() => {
      if (this.state.clicks % 3 == 0){
        Alert.alert(
          'What do you want?!?',
          "You've pressed generate " + this.state.clicks + " times.",
          [
            {text: "I'm not hungry", onPress: () => console.log('Ask me later pressed')},
            {text: "I don't know. You choose", onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'This is fine.', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }
    })
  }

  loadCusineDropDown() {
    return this.state.listOfCuisine.map(cuisine => (
                                             <Picker.Item key={cuisine.cuisine_id} label={cuisine.cuisine_name} value={cuisine} />
                                             ))
  }

  loadSuggestion() {
    if (this.state.selectedRestaurant != null){
      return (
        <View style={{marginTop: 20}}  hide={this.state.selectedRestaurant == null}>
          <Text style={styles.restaurantName}>{this.state.selectedRestaurant.name}</Text>
          <Image style={styles.image} source={{uri: this.state.selectedRestaurant.thumb}}/>
          <Text >{this.state.selectedRestaurant.location.address}</Text>
          <Text >{this.state.selectedRestaurant.user_rating.aggregate_rating} Stars, {this.state.selectedRestaurant.all_reviews_count} Reviews</Text>
        </View>
      );
    }

    return null;
  }

  render() {

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text>Select a Cuisine</Text>
        <Picker
          selectedValue={this.state.selectedCuisine}
          style={{
            width: '100%',
            padding: 15
          }}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({selectedCuisine: itemValue})
          }}>
          {this.loadCusineDropDown()}
        </Picker>
        <TouchableOpacity 
          style={{
            width: 100,
            height: 20,
            backgroundColor: '#005F9E',
            padding: 15,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={this.getRandomRestaurant}>
            <Text style={{color: '#ffffff'}}>Generate</Text>
          </TouchableOpacity>
          {this.loadSuggestion()}
        <Text>{this.state.errorMessage}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 30
  },
  contentContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  restaurantName: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginTop: 10
  }
});
