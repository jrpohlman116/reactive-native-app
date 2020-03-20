import { API_KEY } from '../env'

export function getRestaurantsAPI(lat, long, cuisine) {
    var url = 'https://developers.zomato.com/api/v2.1/search?lat=' + lat + '&lon=' + long + '&radius=16093.4';
    if (cuisine != 0){
        url += '&cuisines=' + cuisine 
    }

    url += '&sort=rating';

    console.log(url)

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'user-key': API_KEY
        }
    })
    .then(response => response.json())
}

export function getCityAPI(lat, long) {
    return fetch('https://developers.zomato.com/api/v2.1/cities?lat=' + lat + '&lon=' + long, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'user-key': API_KEY
        }
    })
    .then(response => response.json())
}

export function getCuisinesAPI(cityId) {
    return fetch('https://developers.zomato.com/api/v2.1/cuisines?city_id=' + cityId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'user-key': API_KEY
        }
    })
    .then(response => response.json())
}