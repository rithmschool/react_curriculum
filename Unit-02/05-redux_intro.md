#### [⇐ Previous](./04-react_router.md) | [Table of Contents](./../readme.md) | [Next ⇒](./06-redux_continued.md)

# Introduction to Redux

### Objectives

By the end of this chapter, you should be able to:

- 

### Intro

Redux is a single state management store.  While it is commonly used with React, it is an entirely separate library that can be used on its own or with a other frameworks. 

### Functional Programming Review

### Pure Functions

### Immutability

### Reducer

Reducers are functions that accept the state and an action and return a new state. We need to make sure that we do not mutate state so very commonly we will use conditional logic to find an action and if we do not find one, we just return the state. Our reducers **MUST** be pure functions

```js
function firstReducer(state=[], action){
    switch(action.type){
        case 'ADD_NUMBERS':
            return 
        case 'SUBTRACT_NUMBERS'
            return
        default:
            return state
    }
}
```

### Actions

We create actions to change the state, which trigger reducers

```js
function sendNumber(num){
    dipatch({
        type: 'NAME_OF_ACTION',
        payload: num
    })
}
```

### Store

Our store accepts a reducer and has methods for getting the state and subscribing and unsubscribing. 

We import the `createStore` from `redux` and create a store with a reducer.

```js
```

What happens if you have multiple reducers? You can import the `combineReducers` function that is part of `redux`.

### Redux Dev Tools

What having a single immutable state store allows us to do is some really awesome stuff like time travelling, hot module reloading and easier debugging. With redux, the only way we can change state is to fire off an action, which creates a new state so that we can always revert and see changes in state! 

### Exercise

#### [⇐ Previous](./04-react_router.md) | [Table of Contents](./../readme.md) | [Next ⇒](./06-redux_continued.md)