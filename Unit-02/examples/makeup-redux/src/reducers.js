import {GET_MAKEUP, GET_BACKGROUND_COLOR} from './actions'

const DEFAULT_STATE = {
  makeupData: {},
  backgroundColor: {}
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  // debugger;
  switch (action.type) {
    case GET_MAKEUP:
      return Object.assign({}, state, {makeupData: action.makeupData})
    case GET_BACKGROUND_COLOR:
      return Object.assign({}, state, {backgroundColor: action.payload})
    default:
      return state
  }
}

export default rootReducer
