import { API_KEY } from '../env'

export function getRestaurantsAPI(lat, long) {
    return fetch('https://developers.zomato.com/api/v2.1/search?lat=' + lat + '&lon=' + long + '&radius=16093.4', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'user-key': API_KEY
        }
    })
    .then(response => response.json())
}
