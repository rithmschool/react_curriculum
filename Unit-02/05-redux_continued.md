#### [⇐ Previous](./05-redux_intro.md) | [Table of Contents](./../readme.md) | [Next ⇒](./07-backend.md)

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

`npm install --save redux-middleware`

### React Router and Redux

### Redux Dev Tools

### Testing Redux

Fortunately, testing Redux is quite easy to do since we are simply testing functions! All we need to do when testing the initialization of a reducer, is pass some defaault values, which might look a bit strange, but this is what Redux wants for testing:

```js

import {store, firstReducer} from './index.js'

describe("Our Store", function(){
  it("It has an initial state", function(){
    const state = firstReducer(undefined, {type: '@@redux/INIT'})
    expect(state).to.deep.equal([])
  });
  it("handles new changes correctly", function(){
    const state = firstReducer(undefined, {type: 'ADD_TODO', value: "eat"})
    expect(state).to.deep.equal(["eat"])
  });
});
```

### Exercise

#### [⇐ Previous](./05-redux_intro.md) | [Table of Contents](./../readme.md) | [Next ⇒](./07-backend.md)