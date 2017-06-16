import axios from 'axios'

export const GET_RANDOM_MAKEUP = 'GET_RANDOM_MAKEUP'
export const GET_RANDOM_COLOR = 'GET_RANDOM_COLOR'


export function getMakeup(makeupData) {
  return { type: GET_RANDOM_MAKEUP, makeupData }
}

export function getColor(randomColor) {
  return { type: GET_RANDOM_COLOR, randomColor }
}

export function getRandomMakeup() {
  return function (dispatch, getState) {
    axios.get("https://makeup-api.herokuapp.com/api/v1/products.json?brand=almay")
      .then((response) => {
        const index = Math.floor(Math.random() * response.data.length)
        dispatch(getMakeup(response.data[index]))
      })
      .catch((error) => console.error('axios error', error))
  }
}

export function getRandomColor() {
  return function (dispatch, getState) {
    const colorArr = getState().makeupData.product_colors; 
    var color = 'red'; 
    if (colorArr) {
      const idx = Math.floor(Math.random() * colorArr.length);
      color = colorArr[idx].hex_value;
    }
    dispatch(getColor({color}));
  }
}