import {createStore} from 'redux'

function sayHi(){
    return {
        type: 'HELLO',
        payload: 'Hi'
    }
}

function sayHello(){
    return {
        type: 'HELLO',
        payload: 'Hello'
    }
}

function firstReducer(state=[], action){
    switch(action.type){
        case "HELLO":
            return [...state, action.payload]
        case "Hi":
            return [...state, action.payload]
        default:
            return state;
    }
}

window.onload = () =>{
    const store = createStore(firstReducer)
    document.querySelector(".hi").addEventListener("click", function(){
        store.dispatch(sayHi())
        console.log(store.getState())
    })
    document.querySelector(".hello").addEventListener("click", function(){
        store.dispatch(sayHello())
        console.log(store.getState())
    })
}