import axios from 'axios'

const randomMovies = ['titanic', 'forrest gump', 'good will hunting']
const randomMovie = randomMovies[Math.floor(Math.random() * randomMovies.length)]

export function getMovie (omdbData) {
  return { type: 'GET_RANDOM_MOVIE', omdbData }
}

export function getRandomMovie () {
  return function (dispatch, getState) {
    axios.get(`http://www.omdbapi.com/?t=${randomMovie}`)
      .then((response) => {
        dispatch(getMovie(response.data))
      })
      .catch((error) => console.error('axios error', error))
  }
}