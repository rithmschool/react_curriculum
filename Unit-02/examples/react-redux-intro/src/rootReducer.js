import {INCREMENT, DECREMENT} from './actions'

const DEFAULT_STATE = 0

export default function(state=DEFAULT_STATE, action = {}){
    switch(action.type){
        case INCREMENT:
            return ++state
        case DECREMENT:
            return --state
        default:
            return state
    }
}