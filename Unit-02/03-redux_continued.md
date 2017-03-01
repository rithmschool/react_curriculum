#### [⇐ Previous](./02-redux_intro.md) | [Table of Contents](./../readme.md) | [Next ⇒](./04-intermediate_react.md)

# Redux Continued

### Objectives

By the end of this chapter, you should be able to:

- Understand the key differences between state in `react` and state in `redux`
- Use `react-redux` to connect `react` and `redux`
- Use `redux` middleware to handle asynchronous actions

### Redux and React

To connect these two libraries we use another library called `react-redux` which gives us a few functions and components to connect redux state to react state. Let's install this library with `npm install --save react-redux`. Once we have this library installed, we will most commonly use the `connect` function from that library to connect react and redux along with a component called `Provider`, which accepts a prop of `store`, which is a `redux` store!

The connect function returns a new function which can wrap a component so it looks like this: `connect(mapStateToProps, mapDispatchToProps)(SomeReactComponent`

### mapStateToProps

The first parameter to connect is called `mapStateToProps` If this argument is specified, the component passed to connect will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called. The results of mapStateToProps must be a plain object*, which will be merged into the component’s props.

If you don't want to subscribe to store updates, pass `null` or `undefined` in place of mapStateToProps. If ownProps is specified as a second argument, its value will be the props passed to your component, and mapStateToProps will be additionally re-invoked whenever the component receives new props. Here is what this might look like:

```js
const mapStateToProps = function(state){
    return {
        // state comes from the redux store
        propertyToPassToReact: state.someValue
    }
}

// we now will have access to this.props.propertyToPassToReact in our component once we connect them using the `connect` function.
```

### MapDispatchToProps

We also want to be able to dispatch our actions from our components, so let's attach these actions onto props for our react components using a function called `mapDispatchToProps`. This will return an object with keys which will be `props` and values which are `redux` actions.

If an object is passed, each function inside it is assumed to be a Redux action creator. An object with the same function names, but with every action creator wrapped into a dispatch call so they may be invoked directly, will be merged into the component’s props. If a function is passed, it will be given dispatch. 

If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps. If you omit it, the default implementation just injects `dispatch` into your component’s props. If ownProps is specified as a second argument, its value will be the props passed to your component, and mapDispatchToProps will be re-invoked whenever the component receives new props just like `mapStateToProps`.

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

This is also commonly done by importing actions from another file:

```js
import { addTodo, updateTodo } from './actions'
import {connect} from 'react-redux'

function mapStateToProps(state) {
  return {
    // create a prop called entireReduxState which is the result of the entire redux state
    entireReduxState: state
  }
}

export default connect(mapStateToProps, { addTodo, updateTodo })(TodoFormContainer);
```

So we just defined two functions that are helpful for connecting redux state to props, and actions to props in our components. But we still haven't actually connected react and redux! To do this, we need to use the `connect` method from the `react-redux` library.

### connect

Here is 

```js
import {connect} from 'react-redux'
import React, {Component} from 'react'

class LearnConnect extends Component {
  render(){
    <div>
      <h1>Hello World!</h1>
      <p>Here is our state </p>
      <pre>
        {JSON.stringify(this.props.reduxStateAsProp, null, 4)}
      </pre>
      <button onClick={() => this.props.someAction()}> Dispatch an action!</button>
    </div>
  }
}

const mapStateToProps = function(state){
    return {
        // state comes from the redux store
        reduxStateAsProp: state
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

export default connect(mapStateToProps, mapDispatchToProps)(LearnConnect)
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

- `create-react-app movie-search` && `cd movie-search`
- `npm install --save redux redux-thunk react-redux`
- `touch src/{actions,reducers,store,MovieDetails}.js`

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

Now that we have an idea of how to connect our react components to our redux application, let's bring back the react-router and build a simple Todo Application using `redux`, `react` and `react-router`. We will have our `actions` and `reducers`. Since our store is so small, we will place it in our `index.js`. 

- `create-react-app redux-react-todo` && `cd redux-react-todo`
- `npm install --save redux react-redux react-router-dom@next redux-devtools-extension # for making dev tools integration easier`

### Component Structure

This application will contain the following components:
- `TodoFormContainer` - connected to redux to determine whether editing or creating should be done and handles redirects when the form is submitted
  - `TodoForm` - a form for creating and editing, contains state but not connected to redux
- `TodoListContainer` - connected to redux to allow for fetching the list of todos
  - `TodoList` - a simple component to render multiple todos
    - `Todo` - a simple component displaying the task and links/buttons to edit and delete

### Setting Up Routes and store

In our `App.js` we can set up the following:

```js
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import TodoListContainer from './TodoListContainer';
import TodoFormContainer from './TodoFormContainer';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to our Todo App!</h1>
        <Link to='/todos'>See Your Todos</Link>
        <br/>
        <Link to="/todos/new">Add New Todo</Link>
        <Route exact path="/todos" component={TodoListContainer} />
        <Route path="/todos/new" component={TodoFormContainer} />
        <Route path="/todos/:id/edit" component={TodoFormContainer} />
      </div>
    );
  }
}
export default App;
```

And in our `index.js` we can set up the following:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(
  rootReducer,
  composeWithDevTools()
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
```


### Redux Actions

The actions we will need are for adding, updating and deleting. Since we are not using a backend, there will be no "fetching" so we do not need these actions.

```js
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export function addTodo(todo) {
  return {
    type: ADD_TODO,
    todo
  }
}

export function updateTodo(todo) {
  return {
    type: UPDATE_TODO,
    todo
  }
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    id
  }
}
```

### Reducers

We can now use these actions in our reducers - remember that reducers need to be `pure` functions!

```js
import { ADD_TODO, UPDATE_TODO, DELETE_TODO } from './actions';

const DEFAULT_STATE = {
  todos: [],
  id: 0
}

export default function games(state = DEFAULT_STATE, action = {}) {
  switch(action.type) {
    
    case ADD_TODO: // IMPLEMENT ME
      // increment the id so it is a unique value
      // return a new object with state as an array of existing todos concatenated with the new todo

    case UPDATE_TODO:
      // create a new array
        // if we find the one to be updated
          // update it
        // regardless, return the todo
      
      // return a new state object
    default:
      return state;

    case DELETE_TODO:
      // return a new array of todos without the one passed to this action
      // return a new object with the todos 
  }
}
```

### Create

To create we will need to do the following:
- Make sure our `TodoFormContainer` can dispatch the create action when the form is submitted, this action should be passed down as a prop to the `TodoForm` component
- Make sure that when we submit the form, we `Redirect` back to the `/todos` route. This will require importing the `Redirect` component from `react-router-dom` and we should be setting a property on state called `redirect`, which will initialize as false, but if true, it will redirect.
- Our `TodoForm` should allow a user to add a `task` and when submitted will use props passed to it from the `TodoFormContainer`.

### Read

Once a todo is created, the `TodoListContainer` should grab the list of todos from the redux state and render the `TodoList` passing in the `todos` as a prop. The `TodoList` component should iterate over the `todos` prop and render `Todo` components. Each `Todo` component should have a link to the `edit` route as well as a button that when clicked will remove the Todo (those will be implemented later)

### Update

When the `edit` button is clicked, a form should appear with the text of the task in an input. When the form is submitted, the `UPDATE_TODO` action should be dispatched and the redux `state` should be modified. When the form is submitted, you should redirect back to `/todos`

### Delete

Each `Todo` component should have a prop called `deleteTodo` which is recieved from the `TodoList` component. The `TodoList` component should recieve this prop from the `TodoListContainer` component, which should import the ` deleteTodo` action and `mapDispatchToAction`. When the delete button is clicked, the `DELETE_TODO` action should be dispatched and the redux `state` should be modified.

### Exercise

Complete CRUD on `todos`! 

#### [⇐ Previous](./02-redux_intro.md) | [Table of Contents](./../readme.md) | [Next ⇒](./04-intermediate_react.md)