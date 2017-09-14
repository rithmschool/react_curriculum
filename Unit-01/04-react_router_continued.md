#### [⇐ Previous](./03-react_router.md) | [Table of Contents](./../readme.md) | [Next ⇒](./05-redux_intro.md)

### Objectives

By the end of this chapter, you should be able to:

- Add redirecting to an application with React router
- Use `context` to programatically redirect.
- Use `withRouter` and `Redirect` as a better and more stable alternative to `context`

### 404s with React Router

Very commonly with routing, you will want a 404 handler for routes that do not exist. To do this with React Router v4, we use a component called `<Switch></Switch>` and place our routes inside. Switch will renders the first child <Route> ( or `<Redirect>` which we will see in a little bit) that matches the location.

You might be wondering, how is this different than just using a bunch of `<Route>` components? The answer is that `<Switch>` is unique in that it renders a route exclusively. In contrast, every `<Route>` that matches the location renders inclusively. 

Consider this code:

```js
import React from 'react'
import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const NotFoundExample = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/will-not-match">More 404!</Link></li>
        <li><Link to="/dsajkdjsaldjskla">404 time!</Link></li>
      </ul>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  </BrowserRouter>
)

const Home = () => (
  <div>
    Welcome home!
  </div>
)

const NotFound = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

export default NotFoundExample

```
You can read more about it [here](https://reacttraining.com/react-router/core/api/Switch)

### Redirecting Programatically

So far we have seen how to set up React Router with different types of routers and create routes and pass props to our routes. This is a great start, but we're missing another essential concept with routing - redirecting!

When we redirect in a single page application, we are **not** doing the same thing as what a normal HTTP redirect would be which involves sending a location header and making a GET request to the value of that location header. We are simply making another AJAX request to load the correct information when we redirect.

With react router v4 we are given access to a `Redirect` component which is useful for conditionally rendering or redirecting as well as a higher order component called `withRouter`, which will allow for accessing the router in any component. 

In many examples you will see another way to programatically redirect (after a form submission, click, and so on) using something called `context` to do that. This is **not** the recommended way of using React Router v4 now, but it is an important concept to understand so we will learn it and then see how we can do better using `withRouter` and the `Redirect` component. 

### Context

In React, we've seen state and props as the core tools we use to pass data and display information with our components, however there is one more API that we can use called `context`. It is **not** recommended that you use context frequently and the docs do mention that the API is subject to change, but context does have some useful moments.

With context, you can add information in a component and have it accessible by all other components without having to pass it down like with props. You just have to establish what in context you will be using in your component. 

Like we mentioned earlier, context does have some useful places and the router is one of them. Since the router is placed in context, we can use it in any of our components and this is commonly done when redirecting. Let's see how this works with the code below.

```js
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'

const Data = () => (<h1>You made it!</h1>)

class Button extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.context.router.history.push('/data')
  }
  
  render(){
    return (
        <div>
          <button onClick={this.handleClick}>Click me!</button>
        </div>
      )
  }
}

const ContextExample = () => (
  <BrowserRouter>
    <div>
      <h2>Start here:</h2>
      <ul>
        <li><Link to="/next">With me!</Link></li>
        <li><Link to="/data">Or just go here!</Link></li>
      </ul>
      <Route path="/next" component={Button}/>
      <Route path="/data" component={Data}/>
    </div>
  </BrowserRouter>
)

export default ContextExample;
```

### Using withRouter instead of context

The React Router v4 and Facebook docs mention that using the router on context (router.context) should not be considered public API. Since context itself is an experimental API and may change in a future release of React, you should avoid accessing `this.context.router` directly in your components. Instead, you can access the variables we store on context through the props that are passed to your `<Route>` component or a component wrapped in `withRouter`.

Instead of using `context`, which is an unstable API and not something that the React docs recommend using publicly, we will be using a higher order component that React Router v4 provides called `withRouter`. If you wrap your component with the `withRouter` component, you can get access to the router using `this.props`. So let's see what our example below would look like with that.

```js
import React, {Component } from "react";
import PropTypes from "prop-types";
import { Route, Link, withRouter } from "react-router-dom";

const Data = () => <h1>You made it!</h1>;

class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push("/data");
  }

  render() {
    return (
      <withRouter>
        <div>
          <button onClick={this.handleClick}>Click me!</button>
        </div>
      </withRouter>
    );
  }
}

const App = () => (
  <div>
    <h2>Start here:</h2>
    <ul>
      <li>
        <Link to="/next">With me!</Link>
      </li>
      <li>
        <Link to="/data">Or just go here!</Link>
      </li>
    </ul>
    <Route path="/next" component={Button} />
    <Route path="/data" component={Data} />
  </div>
);

export default App;
```

### Using the Redirect Component

Along with context and `withRouter`, there is another way to redirect using the <Redirect/> component. 

You can read more about <Redirect/> [here](https://reacttraining.com/react-router/core/api/Redirect)

### Additional Examples of Redirecting

Take a look at [this example](https://reacttraining.com/react-router/web/example/auth-workflow) in the React docs and work your way through what is happening. Click around and see waht the code on the right is doing.

There is quite a lot going on here including some new components and functions:

__withRouter__ - You can get access to the router object’s properties via the withRouter higher-order component. This is the recommended way to access the router object. withRouter will re-render the component every time the route changes.

__Redirect__ - Useful for redirecting, you just have to specify the to prop to tell the router where to go next.

`{...rest}`  - The rest/spread operator for objects is a useful way to spread or list the remaining/rest keys and values in an object with just one parameter. You can read more about it [here](https://babeljs.io/docs/plugins/transform-object-rest-spread/).

### Exercises

Complete the react router [makeup mega market application](https://github.com/rithmschool/react_curriculum_exercises/blob/master/Unit-02/01-react-router/README.md)

Once you've completed that, try refactoring your todo application.  Use the router for the following routes:

- `/todos` - list all of your todos
- `/todos/new` - render a form to create a new todos
- `/todos/:id` - list a single todo
- `/todos/:id/edit` - render a form to edit an existing todo

When a user creates, updates or deletes a todo - they should be redirected to the `/todos` page.


#### [⇐ Previous](./03-react_router.md) | [Table of Contents](./../readme.md) | [Next ⇒](./05-redux_intro.md)

