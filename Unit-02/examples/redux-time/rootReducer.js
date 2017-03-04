import {INCREMENT, DECREMENT} from './actions'

const DEFAULT_STATE = {
    count: 0
}

export default function rootReducer(state=DEFAULT_STATE, action){
    switch(action.type){
        case INCREMENT:
            return {count: ++state.count}
        case DECREMENT:
            return {count: --state.count}
        default:
            return state
    }
}