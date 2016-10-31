#### [⇐ Previous](./04-react_router.md) | [Table of Contents](./../readme.md) | [Next ⇒](./06-redux_continued.md)

# Introduction to Redux

### Objectives

By the end of this chapter, you should be able to:

- 

### Intro

Redux is a single state management store.  While it is commonly used with React, it is an entirely separate library that can be used on its own or with a other frameworks. 

![https://camo.githubusercontent.com/5aba89b6daab934631adffc1f301d17bb273268b/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343535322f415243482d5265647578322d7265616c2e676966](https://camo.githubusercontent.com/5aba89b6daab934631adffc1f301d17bb273268b/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343535322f415243482d5265647578322d7265616c2e676966)

Redux architecture revolves around a strict unidirectional data flow.

This means that all data in an application follows the same lifecycle pattern, making the logic of your app more predictable and easier to understand. It also encourages data normalization, so that you don't end up with multiple, independent copies of the same data that are unaware of one another.

The data lifecycle in any Redux app follows these 4 steps:

1. You call store.dispatch(action).
2. The Redux store calls the reducer function you gave it.
3. The root reducer may combine the output of multiple reducers into a single state tree.
4. The Redux store saves the complete state tree returned by the root reducer.

### Functional Programming Review

### Pure Functions

### Immutability

### Reducer

Reducers are functions that accept the state and an action and return a new state. We need to make sure that we do not mutate state so very commonly we will use conditional logic to find an action and if we do not find one, we just return the state. Our reducers **MUST** be pure functions

```js
function firstReducer(state=[], action){
    switch(action.type){
        case 'ADD_NAME':
            return [...state, action.payload] 
        case 'REMOVE_NAME'
            const idx = state.indexOf(action.payload)
            return state.slice(0,idx).concat(state.slice(idx+1))
        default:
            return state
    }
}
```

### Actions

We create actions to change the state, which trigger reducers

```js
function addName(name){
    dipatch({
        type: 'ADD_NAME',
        payload: name
    })
}
function removeName(name){
    dipatch({
        type: 'REMOVE_NAME',
        payload: name
    })
}
```

### Store

Our store accepts a reducer and has methods for getting the state, dispatching actions and subscribing and unsubscribing. 

We import the `createStore` from `redux` and create a store with a reducer.

```js
import {createStore} from 'redux' // bring in the createStore method

let store = createStore(firstReducer)

// we can now dispatch actions and get state from the store

let initialState = store.getState()

console.log(initialState) // this will be an array

store.dispatch(addName('Elie'))
store.dispatch(addName('Matt'))
store.dispatch(addName('Tim'))

console.log(store.getState()) // this object will have an array with three values

store.dispatch(removeName('Elie'))

console.log(store.getState()) // this array will have 2 values 
```

What happens if you have multiple reducers? You can import the `combineReducers` function that is part of `redux`.

### Redux Dev Tools

What having a single immutable state store allows us to do is some really awesome stuff like time travelling, hot module reloading and easier debugging. With redux, the only way we can change state is to fire off an action, which creates a new state so that we can always revert and see changes in state! 

### Exercise

#### [⇐ Previous](./04-react_router.md) | [Table of Contents](./../readme.md) | [Next ⇒](./06-redux_continued.md)