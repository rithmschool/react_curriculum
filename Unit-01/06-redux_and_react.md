#### [⇐ Previous](./05-redux_intro.md) | [Table of Contents](./../readme.md) | [Next ⇒](./07-testing.md)

# Redux Continued

### Objectives

By the end of this chapter, you should be able to:

- Understand the key differences between state in `react` and state in `redux`
- Use `react-redux` to connect `react` and `redux`
- Use `redux` middleware to handle asynchronous actions

### Redux and React

To connect these React with Redux we need to use another library called, unsurprisingly, `react-redux`. This library gives us a few functions and components to connect Redux state to React state. Let's install this library with `npm install --save react-redux`. Once it's installed, we will most commonly use the `connect` function from that library to connect React and Redux along with a component called `Provider`. This component accepts a prop of `store`, which is a `redux` store!

The `connect` function returns a new function which can wrap a component. Syntactically, then, using `connect` looks something like this: `connect(mapStateToProps, mapDispatchToProps)(SomeReactComponent)`. 

So what's up with `mapStateToProps` and `mapDispatchToProps`? Let's find out!

### `mapStateToProps`

The first parameter to `connect` controls how `state` (from Redux) is passed to `props` (in React). By convention, this argument is called `mapStateToProps`. 

You don't need specify how state should get mapped to props; if you want to omit such a specification, just pass in `null` or `undefined` for the first argument in `connect`. However, if you do provide a mapper, then then the component you pass into `connect` will hook into Redux via this mapper. 

In other words, whenever the redux store is updated, the new state will be passed to the component's props via the object returned by `mapStateToProps`. Here's a quick example:

```js
const mapStateToProps = function(state){
    return {
        // state comes from the redux store
        propertyToPassToReact: state.someValue
    }
}

// we now will have access to this.props.propertyToPassToReact in our component once we connect them using the `connect` function.
```

In addition, you can pass in a second argument to `mapStateToProps` for any additional props. If this argument (`ownProps` in the [docs](https://github.com/reactjs/react-redux/blob/master/docs/api.md)) is provided, `ownProps` will be the props passed to the component. In this case, `mapStateToProps` will be called both when the state changes from redux, and when the component receives new props.

### `mapDispatchToProps`

The first argument in `connect` controls how we pass data from `redux` to `react`. The second argument, `mapDispatchToProps`, does the opposite: it controls how we dispatch actions from `react` into `redux`. Structurally, this is similar to `mapStateToProps`: both are functions that return object. In the case of `mapDispatchToProps`, the object's keys correspond to React `props`, and the values correspond to Redux actions.

As with `mapStateToProps`, if you don't want to provide a function for `mapDispatchToProps` you can pass in `null` or `undefined`. By default, this function takes in `dispatch` as its first argument, and an optional `ownProps` object as a second argument. Here's a basic example:

```js
const mapDispatchToProps = function(dispatch) {
    return {
        someAction: function(param) {
            // call the reducer!
            dispatch({
                type: "NAME_OF_ACTION",
                value: param
            })
        }
    }
}
```

In this case, our component should have a prop of `someAction`, which, when invoked, will dispatch an action to our reducer.

Unlike `mapStateToProps`, `mapDispatchToProps` does not need to be a function. It can also be an object that directly maps props to actions. Very commonly, we will pass in an object instead of a function when we import actions from another file:

```js
import { addTodo, updateTodo } from './actions'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    // create a prop called entireReduxState which is the result of the entire redux state
    entireReduxState: state
  }
}

export default connect(mapStateToProps, { addTodo, updateTodo })(TodoFormContainer);
```

Here we defined two functions that are helpful for connecting redux state to props, and actions to props in our components. But we still haven't actually connected react and redux! To do this, we need to use the `connect` method from the `react-redux` library.

### `connect`

Let's use the `connect` function to build a little application that increments a count. First, let's build our reducer and our actions:

`rootReducer.js`

```js
import { ADD } from './actions.js';

const DEFAULT_STATE = { count: 0 }

export default function rootReducer(state=DEFAULT_STATE, action={}) {
  switch(action.type) {
    case ADD:
      return {count: state.count + 1}

    default:
      return state;
  }
}
```

Next, let's add a single action to increment a counter:

`actions.js`

```js
export const ADD = 'ADD';

export function add() {
  return {
    type: ADD
  }
}
```

Next, let's build our main component, which we'll hook up to `redux`:

`LearnConnect.js`

```js
import { connect } from 'react-redux'
import { add } from './actions'
import React, {Component} from 'react'

class LearnConnect extends Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <p>Here is our state</p>
        <pre>
          {JSON.stringify(this.props.reduxStateAsProp, null, 4)}
        </pre>
        <button onClick={() => this.props.add() }>
          Add!
        </button>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    // state comes from the redux store
    reduxStateAsProp: state
  }
}

export default connect(mapStateToProps, {add})(LearnConnect)
```

So far, so good. One issue remains: how do we place our connection into a React component? The final step we need to do is inject our Redux store into a component called `Provider`.

### <Provider><Provider/>

`react-redux` gives us a component called `Provider`, which accepts a prop of a Redux store. To finish up our app, let's write our `index.js`:

```js
import { Provider } from 'react-redux'
import Connection from './LearnConnect'
import React from 'react'
import { createStore } from 'redux'
import rootReducer from './rootReducer'
import {render} from 'react-dom'

const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <Connection/>
  </Provider>,
  document.getElementById('root')
)
```

Start up the application, and you should be able to increment the count!

### Async Redux with Redux Thunk

So far all of our actions have been synchronous. But what happens if we want to perform some asynchronous action (e.g. an AJAX call or a `setTimeout`). Unfortunately, Redux by itself has no built in way of handling async actions. To add this functionality we need to add some middleware to `redux`. The two most popular pieces of middleware for managing asynchronous code with `redux` are `redux-thunk`, which uses functions and promises (and ES2017 async functions) and `redux-saga`, which makes use of ES2015 generators. 

While `redux-saga` has some advantages, it is a bit more challenging to understand so we will be using `redux-thunk` and can install it with `npm install --save redux-thunk`. We will add this middleware inside of our `store`. 

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
    axios.get(`https://www.omdbapi.com/?t=titanic&apikey=thewdb`)
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

Let's build a simple application where we will pre-populate a random array of movies and a user will see one of them! We will be using the OMDB API and since we are making AJAX requests, the `axios` library. For managing asynchronous state with redux we will be using `redux-thunk`. We will also be storing a history of their searches. We will be using one simple component, `MovieDetails`.

- `create-react-app movie-search` && `cd movie-search`
- `npm install --save redux redux-thunk react-redux axios`
- `touch src/{actions,reducers,store,MovieDetails}.js`

Now let's start with our `store` and add our necessary middleware.

```js
import { createStore, compose, applyMiddleware } from 'redux' // add applyMiddleware
import thunk from 'redux-thunk' 
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
import React, { Component } from 'react'
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
    )
  }
}

export default App
```

We also need to create our `MovieDetails` component

```js
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getRandomMovie } from './actions'

class MovieDetails extends Component {
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

Next, we need to define our actions! We'll be using `axios` inside of our `actions.js` to make AJAX requests:

```js
import axios from 'axios'

const randomMovies = ['titanic', 'forrest gump', 'good will hunting']
const randomMovie = randomMovies[Math.floor(Math.random() * randomMovies.length)]

export const GET_RANDOM_MOVIE = 'GET_RANDOM_MOVIE'

export function getMovie (omdbData) {
  return { type: GET_RANDOM_MOVIE, omdbData }
}

export function getRandomMovie () {
  return function (dispatch, getState) {
    axios.get(`https://www.omdbapi.com/?t=${randomMovie}&apikey=thewdb`)
      .then((response) => {
        dispatch(getMovie(response.data))
      })
      .catch((error) => console.error('axios error', error))
  }
}
```

Finally, we can render everything inside of our `index.js`:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

### React Router and Redux

Now that we have an idea of how to connect our react components to our redux application, let's bring back the react-router and build a simple Todo Application using `redux`, `react` and `react-router`. We will have our `actions` and `reducers`. Since our store is so small, we will place it in our `index.js`. 

- `create-react-app redux-react-todo` && `cd redux-react-todo`
- `npm install --save redux react-redux react-router-dom@next`

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

#### [⇐ Previous](./05-redux_intro.md) | [Table of Contents](./../readme.md) | [Next ⇒](./07-testing.md)
