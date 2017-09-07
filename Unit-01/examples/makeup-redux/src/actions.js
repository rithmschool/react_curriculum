import axios from 'axios'

export const GET_RANDOM_MAKEUP = 'GET_RANDOM_MOVIE'

export function getMakeup(makeupData) {
  debugger;
  return { type: GET_RANDOM_MAKEUP, makeupData }
}

export function getRandomMakeup() {
  return function (dispatch, getState) {
    debugger;
    axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl")
      .then((response) => {
        debugger;
        const index = Math.floor(Math.random() * response.data.length)
        dispatch(getMakeup(response.data[index]))
      })
      .catch((error) => console.error('axios error', error))
  }
}
