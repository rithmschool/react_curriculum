#### [⇐ Previous](./04-react_router_continued.md) | [Table of Contents](./../readme.md) | [Next ⇒](./06-redux_and_react.md)

# Introduction to Redux

## Objectives

By the end of this chapter, you should be able to:

- Explain what **redux** is and the problems it tries to solve
- Compare and contrast **actions**, **reducers** and **stores**
- Build applications using **redux** as a state manager

## Intro

Redux is a centralized state management store.  While it is commonly used with React, it is an entirely separate library that can be used on its own or with a other frameworks.

![https://css-tricks.com/wp-content/uploads/2016/03/redux-article-3-04.svg](https://css-tricks.com/wp-content/uploads/2016/03/redux-article-3-04.svg)

Here's an overview of the purpose of redux, courtesy of their [documentation](http://redux.js.org/docs/basics/DataFlow.html):

>Redux architecture revolves around a strict unidirectional data flow.
>
>This means that all data in an application follows the same lifecycle pattern, making the logic of your app more predictable and easier to understand. It also encourages data normalization, so that you don't end up with multiple, independent copies of the same data that are unaware of one another.
>
>The data lifecycle in any Redux app follows these 4 steps:
>
>1. You call `store.dispatch(action)`.
>1. The Redux store calls the reducer function you gave it.
>1. The root reducer may combine the output of multiple reducers into a single state tree.
>1. The Redux store saves the complete state tree returned by the root reducer.

## Functional Programming Review

Redux revolves around some core concepts in functional programming. Let's examine these in more detail before we talk about reducers.

### Pure Functions

A *pure function* is a predictable function that does not have any side-effects. What does that mean? **Side effects** occur when your function modifies the external environment somehow. Consider the following `foo` function:

```js

var myObj = {};

function setObject(a, b) {
    myObj[a] = b;
}

// all of these modify the same object
setObject('firstNumber', 55); // { firstNumber: 55 }
setObject('secondNumber', 21); // { firstNumber: 55, secondNumber: 21 }
setObject('firstNumber', 1); // { firstNumber: 1, secondNumber: 21 }

```

This function is NOT pure because it **mutates** `myObj` which is in the global scope. In fact, all this function does is create side effects (_bleh_).

Instead, pure functions need to be **deterministic**, that is, they need to produce the same output for the same input regardless of how many times the function is called.
 This property is also known as idempotence. This makes the function predictable, easier to reason about, and easier to test.

Here is a "purified" version of the `setObject` function:

```js

function setObjectPure(a, b) {
    var myObj = { a: b };
    return myObj;
}

// all of these are separate objects
setObject('firstNumber', 55); // { firstNumber: 55 }
setObject('secondNumber', 21); // { secondNumber: 21 }
setObject('firstNumber', 1); // { firstNumber: 1 }

```

Notice how a new object is created in every function call? That means `setObjectPure` is side-effect free now.

### Pure Functions Quiz

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

The function is **impure** because there is a side effect: we are mutating the `arr` variable.

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

## Reducers

Redux is all about **reducers** (hence the name). **Reducers are pure functions** that accept a state and an action, and return a new state. We need to make sure that we do not mutate state, so very commonly we will use conditional logic to find an action. If we do not find one, we just return the state.

It bears repeating: our reducers **MUST** be pure functions.

Here's an example of a reducer that updates an array of names:

```js
function firstReducer(state=[], action){
    if (action.type === 'ADD_NAME') {
        // return a new array with old state and new payload
        const newState = [...state, action.payload]
        return newState;
    } else if (action.type === 'REMOVE_NAME') {
        // get the index of the item to remove
        const idx = state.indexOf(action.payload);
        const newState = [...state];
        // splice is used to remove 1 item at index idx
        return newState.splice(idx, 1);
    } else {
        // by default return original state
        return state;
    }
}
```

Be very careful when you're writing your own reducers that you aren't accidentally mutating state!
If you're using methods like `pop`, `shift`, `unshift`, `push`, or `splice` on arrays, for instance, you **first must create a copy of the array**.

_Note: Remember that composite data structures in JavaScript (Objects, Arrays) are passed by memory reference by default, whereas primitives (Numbers, Strings) are copied.
  That means if you pass `state` as an argument and state is an Object or Array, then it acting on it will modify it directly. This happens even if you define another variable pointing to it, for example: `const x = state`; actions on `x` _will_ modify state as well!_

## Actions & Action Creators

### Actions

Reducers are not supposed to be called directly. Instead, fire off an **action** which is intercepted and processed by a reducer.
 In Redux, actions are simple instructions that tell the reducer(s) how to adjust state.
 They come in object form and by convention contain a `type` which is, by convention, a string in UPPER_SNAKE_CASE,
 and (optionally) a payload that can be anything. For example:

```js

{
    type: 'ADD_NAME',
    payload: 'Jimmy'
}

```

As you may have guessed, this is an action that tells the reducer to add 'Jimmy' to the list of names in state.

Many projects maintain a file called something like `actionConstants.js` that just lists all of the possible actions.
 It is usually preferable to use string constants instead of inline string literals when passing actions around, for example:

 `actionConstants.js`

 ```js

 const ADD_NAME = 'ADD_NAME';
 const REMOVE_NAME = 'REMOVE_NAME';

 ```

 This may look like unnecessary overhead, but it makes debugging easier.

### Action Creators

Action Creators are just functions that create actions.
 Sometimes people use the word `action` to refer to an action creator, since the actual actions themselves are the return values of the functions:

```js
function addName(name){
    return {
        type: ADD_NAME,
        payload: name
    }
}
function removeName(name){
    return {
        type: REMOVE_NAME,
        payload: name
    }
}
```

These functions will **dispatch actions** whenever your app wants to make changes to state.

In a smaller project, you can just put all the action creators and constants in `actions.js`.

## Store

In Redux, the store is an object that holds the **state tree** for the application. Our store accepts a single reducer (called the root reducer) and has methods for getting the state, dispatching actions, and subscribing and unsubscribing.
 If we have multiple reducers, we can merge them together into a root reducer with the `combineReducers` function that `redux` provides. For now, we will just be starting with a single reducer.

Let's create our first store! To begin, we'll need to import `createStore` from `redux` and create a store with a reducer.

```js
import { createStore } from 'redux'; // bring in the createStore method

let store = createStore(firstReducer);

// we can now dispatch actions and get state from the store

let initialState = store.getState();

console.log(initialState); // this will be an array

store.dispatch(addName('Elie'));
store.dispatch(addName('Matt'));
store.dispatch(addName('Tim'));

console.log(store.getState()); // this object will have an array with three values

store.dispatch(removeName('Elie'));

console.log(store.getState()); // this array will have 2 values
```

## Redux Dev Tools

Having a single immutable state store allows us to do some really awesome stuff like time traveling, hot module reloading, and easier debugging.
 With Redux, the only way we can change state is to fire off an action, which goes through the reducer to produce a new state.
  Since our store is keeping track of this, we can always revert and see changes in state! You can even replay the series of actions that you (or a user) took after visiting your app.
   You can get the Chrome extention [here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en), and here is the code necessary to use the extention with a redux application (this is a sample store):

```js
import { createStore, compose } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer, compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
));

export default store;
```

Once this is installed, you can open up the Chrome dev tools and check out the Redux tab. Here is where the "time travelling takes place" via the following:

`commit` - take any changes you have made to the redux state and set it to be the new initial state. You can do this as many times as you want.
`revert` - go back to an original state (a previous commit)
`reset` - undo all commits and revert to the original state

You can read more about the dev tools [here](https://onsen.io/blog/react-redux-devtools-with-time-travel/).

## Additional Resources

[Great Redux Tutorial Videos](https://egghead.io/courses/getting-started-with-redux) from the creator of Redux, Dan Abramov
[What is functional programming?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)

## Exercise

Complete the [Redux Exercise](https://github.com/rithmschool/react_curriculum_exercises/blob/master/Unit-01/05-redux)

#### [⇐ Previous](./04-react_router_continued.md) | [Table of Contents](./../readme.md) | [Next ⇒](./06-redux_and_react.md)