#### [⇐ Previous](./03-react_router_continued.md) | [Table of Contents](./../readme.md) | [Next ⇒](./05-redux_and_react.md)

# Introduction to Redux

### Objectives

By the end of this chapter, you should be able to:

- Explain what `redux` is and the problems it tries to solve
- Compare and contrast `actions`, `reducers` and `stores`
- Build applications using `redux` as a state manager

### Intro

Redux is a single state management store.  While it is commonly used with React, it is an entirely separate library that can be used on its own or with a other frameworks. 

![https://css-tricks.com/wp-content/uploads/2016/03/redux-article-3-04.svg](https://css-tricks.com/wp-content/uploads/2016/03/redux-article-3-04.svg)

Here's an overview of the purpose of redux, courtesy of their [documentation](http://redux.js.org/docs/basics/DataFlow.html).

>Redux architecture revolves around a strict unidirectional data flow.
>
>This means that all data in an application follows the same lifecycle pattern, making the logic of your app more predictable and easier to understand. It also encourages data normalization, so that you don't end up with multiple, independent copies of the same data that are unaware of one another.
>
>The data lifecycle in any Redux app follows these 4 steps:
>
>1. You call `store.dispatch(action)`.
>2. The Redux store calls the reducer function you gave it.
>3. The root reducer may combine the output of multiple reducers into a single state tree.
>4. The Redux store saves the complete state tree returned by the root reducer.

### Functional Programming Review

Redux revolves around some core concepts in functional programming. Let's examine these in more detail before we talk about reducers.

### Pure Functions

A *pure function* is a predictable function that does not have any side-effects. What does that mean? When a pure function is called many times with the same input, it will always give the same output (this is also known as idempotence). This makes the function predictable, easier to reason about, and easier to test. Another characteristic of pure functions are that they do not modify external state, or change values outside of their scope. 

Let's try to identify some pure and impure functions:

Are the following functions **pure** or **impure**?

```js
var arr = [2, 4, 6];
function doubleValues(arr) {
    for(var i = 0; i < arr.length; i++){
        arr[i] = arr[i] * 2;
    }
}

doubleValues(arr);
arr; // [4, 8, 12]

doubleValues(arr);
arr; // [8, 16, 24]
```

The function is **impure** because there is a side effect: we are mutating (or changing) the `arr` variable. 

```js
var arr = [2, 4, 6];
function doubleValues(arr) {
    return arr.map(function(val){
        return val * 2;
    });
}

doubleValues(arr); // [4, 8, 12]
doubleValues(arr); // [4, 8, 12]
doubleValues(arr); // [4, 8, 12]
```

This function is **pure** because there is no side effect. If we wanted to double the result of double, we could combine these functions together! `doubleValues(doubleValues(arr)) // [8, 16, 24]` and we still would not change the `arr` variable. Pretty cool!

How about this one?

```js
var start = {};

function addNameToObject(obj,val){
    obj.name = val;
    return obj;
}

addNameToObject(start, "Elie");
```

The function is **impure** because there is a side effect: we are mutating (or changing) the `start` variable. If you take a look at `start` after calling `addNameToObject`, you'll see that it's no longer an empty object!

```js
var start = {};

function addNameToObject(obj,val){
    var newObj = {name: val};
    return Object.assign({}, obj, newObj);
}

addNameToObject(start, "Matt");
```

The function is **pure** because there is a not side effect and we are not mutating or changing the `start` variable. Instead, we're returning a brand new object based on the structure of `start`.

Here's another one:

```js
var arr = [1, 2, 3, 4];

function addToArr(arr,val) {
    arr.push(val);
    return arr;
}

addToArr(arr, 5); // [1, 2, 3, 4, 5]
arr; // [1, 2, 3, 4, 5]
```

The function is **impure** because there is a side effect: we are mutating (or changing) the `arr` variable. 

```js
var arr = [1, 2, 3, 4];
function addToArr(arr,val) {
    var newArr = arr.concat(val);
    return newArr;
}

addToArr(arr, 5); // [1, 2, 3, 4, 5]
arr; // [1, 2, 3, 4]
```

The function is **pure** because there is a not side effect and we are not mutating or changing the `arr` variable. 

You can read more about pure functions [here](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976#.d1qdboexh), [here](https://egghead.io/lessons/javascript-redux-pure-and-impure-functions), and if you are looking for a more advanced read, take a look [here](http://www.nicoespeon.com/en/2015/01/pure-functions-javascript/).

### Reducer

Reducers are pure functions that accept a state and an action, and return a new state. We need to make sure that we do not mutate state, so very commonly we will use conditional logic to find an action. If we do not find one, we just return the state. 

It bears repeating: our reducers **MUST** be pure functions.

Here's an example of a reducer that updates an array of names:

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

Be very careful when you're writing your own reducers that you aren't accidentally mutating state! If you're using methods like `pop`, `shift`, `unshift`, `push`, or `splice` on arrays, for instance, you're probably doing something wrong.

### Actions

We create actions to change the state and trigger reducers. Here's what that might look like for the example above:

```js
function addName(name){
    return {
        type: 'ADD_NAME',
        payload: name
    }
}
function removeName(name){
    return {
        type: 'REMOVE_NAME',
        payload: name
    }
}
```

### Store

Our store accepts a reducer and has methods for getting the state, dispatching actions, and subscribing and unsubscribing. If we have multiple reducers, we can merge them together with the `combineReducers` function that `redux` provides, but we will just be starting with a single reducer.

Let's create our first store! To begin, we'll need to import `createStore` from `redux` and create a store with a reducer.

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

Having a single immutable state store allows us to do some really awesome stuff like time traveling, hot module reloading, and easier debugging. With redux, the only way we can change state is to fire off an action, which creates a new state so that we can always revert and see changes in state! You can get the Chrome extention [here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en), and here is the code necessary to use the extention with a redux application (this is a sample store):

```js
import { createStore, compose } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer, compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
))

export default store
```

Once this is installed, you can open up the Chrome dev tools and check out the redux tab. Inside here you can time travel and do the following:

`commit` - take any changes you have made to the redux state and set it to be the new initial state. You can do this as many times as you want.
`revert` - go back to an original state (a previous commit)
`reset` - undo all commits and revert to the original state

You can read more about the dev tools [here](https://onsen.io/blog/react-redux-devtools-with-time-travel/).

### Exercises

Build a simple todo application but include redux to manage your data! You should have actions for creating, updating and deleting todos. Remember that since you are using redux, all of your reducers must be pure functions so each of these CRUD operations **must** be done using pure functions. 

- `/todos` - list all of your todos
- `/todos/new` - render a form to create a new todos
- `/todos/:id` - list a single todo
- `/todos/:id/edit` - render a form to edit an existing todo

#### [⇐ Previous](./03-react_router_continued.md) | [Table of Contents](./../readme.md) | [Next ⇒](./05-redux_and_react.md)

