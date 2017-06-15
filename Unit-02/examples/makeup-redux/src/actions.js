import axios from 'axios'

export const GET_MAKEUP = 'GET_MAKEUP'
export const GET_BACKGROUND_COLOR = "GET_BACKGROUND_COLOR"

export function dispatchMakeup(makeupData) {
  // makeupData is an object with key product_colors
  // product_colors is an array of 6 objects, each with key hex_value
  // debugger;
  return { type: GET_MAKEUP, makeupData }
}

export function getMakeup() {
  // debugger;
  // thunk allows us access to dispatch, getState, and extraArgument
  return function (dispatch, getState) {
    axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
      .then((response) => {
        // const index = Math.floor(Math.random() * response.data.length)
        const index = 11;
        dispatch(dispatchMakeup(response.data[index]))
      })
      .catch((error) => console.error('axios error', error))
  }
}

export function getBackgroundColor(colorArray) {
  const index = Math.floor(Math.random() * colorArray.length)
  return { type: GET_BACKGROUND_COLOR, payload: {backgroundColor: colorArray[index]}}
}
