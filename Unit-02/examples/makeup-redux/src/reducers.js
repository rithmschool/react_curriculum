import {GET_RANDOM_MAKEUP, GET_RANDOM_COLOR} from './actions'

const DEFAULT_STATE = {
  makeupData: {}
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_RANDOM_MAKEUP:
      return Object.assign({}, state, {makeupData: action.makeupData})
    case GET_RANDOM_COLOR:
      return Object.assign({}, state, {randomColor: action.randomColor})
    default:
      return state
  }
}

export default rootReducer
