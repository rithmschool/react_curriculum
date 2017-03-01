#### [⇐ Previous](./02-redux_intro.md) | [Table of Contents](./../readme.md) | [Next ⇒](./04-intermediate_react.md)

# Redux Continued

### Objectives

By the end of this chapter, you should be able to:

- Understand the key differences between state in `react` and state in `redux`
- Use `react-redux` to connect `react` and `redux`
- Use `redux` middleware to handle asynchronous actions

### Redux and React

To connect these two libraries we use another library called `react-redux` which gives us a few functions and components to connect redux state to react state. Let's install this library with `npm install react-redux`

### mapStateToProps

In order to connect our `redux` state to our react components, we create a function called `mapStateToProps`, which will turn our properties on `redux` state into `props` that we can use in our `react` components

```js
const mapStateToProps = function(state){
    return {
        // state comes from the redux store
        propertyToPassToReact: state.someValue
    }
}

// we now will have access to this.props.propertyToPassToReact in our component once we connect them!
```

### MapDispatchToProps

We also want to be able to dispatch our actions from our components, so let's attach these actions onto props for our react components using a function called `mapDispatchToProps`. This will return an object with keys which will be `props` and values which are `redux` actions.

```js
const mapDispatchToProps = function(dispatch){
    return {
        someAction: function(param){
            // call the reducer!
            dispatch({
                type: "NAME_OF_ACTION",
                value: param
            })
        }
    }
}
```

So we just defined two functions that are helpful for connecting redux state to props, and actions to props in our components. But we still haven't actually connected react and redux! To do this, we need to use the `connect` method from the `react-redux` library.

### connect

```js
import {connect} from 'react-redux'

const mapStateToProps = function(state){
    return {
        // state comes from the redux store
        propertyToPassToReact: state.someValue
    }
}


const mapDispatchToProps = function(dispatch){
    return {
        someAction: function(param){
            // call the reducer!
            dispatch({
                type: "NAME_OF_ACTION",
                value: param
            })
        }
    }
}

const firstConnection = connect(mapStateToProps, mapDispatchToProps)

// ideally we will have many connections
```

So we just created our connection, but how do we place our connection into a react component? The final step we need to do is inject our redux store into a ocmponent called `Provider`

### <Provider><Provider/>

`react-redux` gives us a component called `Provider`, which accepts a prop of a store. 

```js
import Provider from 'react-redux'
import App from './js/components/App.jsx'
import store from './js/index.js'
import {render} from 'react-dom'

<Provider store = {store}>
    <App/> 
<Provider/>
```

We can now bring in our connection to our app component to finalize everything!

```js
import {connection} from './index.js'
import React, {component} from 'react'

class App extends Component {
    constructor(props){
        super(props)
    }
    render(){
        <div>
            <h1>{this.props.propertyToPassToReact}</h1>
        </div>
    }
}

export default connection(App)
```

### Async Redux with Redux Thunk

So far all of our actions have been synchronous, but what happens if we want to do something async (AJAX call, setTimeout etc) Unfortunately, Redux by itself has no built in way of handling async actions. To add this functionality we need to add some middleware to `redux`. The two most popular pieces of middleware for managing asynchronous code with `redux` are `redux-thunk`, which uses functions and promises (and ES2017 async functions) and `redux-saga`, which makes use of ES2015 generators. 

While `redux-saga` has some advantages, it is a bit more challenging to understand so we will be using `redux-think` and can install it with `npm install --save redux-thunk`. We will adding this middleware inside of our `store`. 

```js
import { createStore, compose, applyMiddleware } from 'redux' // add applyMiddleware 
import thunk from 'redux-thunk' // import our middleware
import rootReducer from './reducers'

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk), // add our middleware
  // make sure we have the dev tools as well!
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
))

export default store
```

Now that we have this implemented, we can add some async actions! Let's use the axios `npm install --save axios` library for some help with AJAX requests (we could use jQuery, but we don't need the entire library). Here is what that might look like:

```js
import axios from 'axios' 

export function someAction (omdbData) {
  return { type: 'ADD_OMDB_DATA', omdbData }
}

export function asyncExample (imdbID) {
  return (dispatch) => {
    axios.get(`http://www.omdbapi.com/?t=titanic`)
      .then((response) => {
        dispatch(someAction(response.data))
      })
      .catch((error) => {
        console.error('axios error', error)
      })
  }
}
```

### Sample OMDB Application with Redux-Thunk

Let's build a simple application where we will prepopulate a random array of movies and a user will see one of them! We will be using the OMDB API and since we are making AJAX requests, the `axios` library. For managing asynchronous state with redux we will be using `redux-thunk`. We will also be storing a history of their searches. We will be using one simple component, `MovieDetails`.

1. `create-react-app movie-search` && `cd movie-search`
2. `npm install --save redux redux-thunk react-redux`
3. `touch src/{actions,reducers,store,MovieDetails}.js`

Now let's start with our `store` and add our necessary middleware.

```js
import { createStore, compose, applyMiddleware } from 'redux' // add applyMiddleware
import thunk from 'redux-thunk' // import
import rootReducer from './reducers'

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk), // middleware
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
))

export default store
```

Since we don't have any reducers, let's make one in `reducers.js`

```js
import {GET_RANDOM_MOVIE} from './actions'

const DEFAULT_STATE = {
  omdbData: {}
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_RANDOM_MOVIE:
      return Object.assign({}, state, {omdbData: action.omdbData})
    default:
      return state
  }
}

export default rootReducer
```

Now let's use this reducer in our `App.js`

```js
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store'
import MovieDetails from './MovieDetails'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          Let's see a random movie!
          <MovieDetails/>
        </div>
      </Provider>
    );
  }
}

export default App;
```

And finally create our `MovieDetails` component

```js
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getRandomMovie } from './actions'

class MovieDetails extends Component {
  constructor(props){
    super(props)
  }
  
  // make our AJAX call when the component mounts
  componentDidMount () {
    this.props.dispatch(getRandomMovie())
  }

  render () {
    const { Title, Plot, Year, Poster } = this.props
    return (
      <div>
        <section>
          <h1>{Title}</h1>
          <h2>{Year}</h2>
          <p>{Plot}</p>
          <img src={Poster} alt=""/>
        </section>
      </div>
    )
  }
}

// after actions are dispatched, add the redux state onto props for the component
const mapStateToProps = (state, ownProps) => {
  return state.omdbData
}

// make sure we connect this component with redux and export it out
export default connect(mapStateToProps)(MovieDetails)
```

### React Router and Redux



### Exercise

Build an application 

#### [⇐ Previous](./02-redux_intro.md) | [Table of Contents](./../readme.md) | [Next ⇒](./04-intermediate_react.md)