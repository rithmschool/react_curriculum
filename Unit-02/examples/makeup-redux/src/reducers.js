import {GET_RANDOM_MAKEUP} from './actions'

const DEFAULT_STATE = {
  makeupData: {}
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_RANDOM_MAKEUP:
      debugger;
      return Object.assign({}, state, {makeupData: action.makeupData})
    default:
      return state
  }
}

export default rootReducer
