#### [⇐ Previous](./03-react_router.md) | [Table of Contents](./../readme.md) | [Next ⇒](./05-redux_intro.md)

### Objectives

By the end of this chapter, you should be able to:

- Add redirecting to an application with React router
- Use `context` when necessary to programatically redirect.

### Redirecting Programatically

So far we have seen how to set up React Router with different types of routers and create routes and pass props to our routes. This is a great start, but we're missing another essential concept with routing - redirecting!

When we redirect in a single page application, we are **not** doing the same thing as what a normal HTTP redirect would be which involves sending a location header and making a GET request to the value of that location header. We are simply making another AJAX request to load the correct information when we redirect.

With react router v4 we are given access to a `Redirect` component which is useful for conditionally rendering or redirecting, but if we need to redirect programatically (after a form submission, click, and so on) we can use something called `context` to do that. 

### Context

In React, we've seen state and props as the core tools we use to pass data and display information with our components, however there is one more API that we can use called `context`. It is **not** recommended that you use context frequently and the docs do mention that the API is subject to change, but context does have some useful moments.

With context, you can add information in a component and have it accessible by all other components without having to pass it down like with props. You just have to establish what in context you will be using in your component. 

Like we mentioned earlier, context does have some useful places and the router is one of them. Since the router is placed in context, we can use it in any of our components and this is commonly done when redirecting. Let's see how this works with the code below.

```js
import React, {PropTypes, Component} from 'react'
import {
  BrowserRouter as Router,
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
    this.context.router.push('/data')
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
  <Router>
    <div>
      <h2>Start here:</h2>
      <ul>
        <li><Link to="/next">With me!</Link></li>
        <li><Link to="/data">Or just go here!</Link></li>
      </ul>
      <Route path="/next" component={Button}/>
      <Route path="/data" component={Data}/>
    </div>
  </Router>
)

export default ContextExample;
```

### Using withRouter instead of context

### Using the Redirect Component

### Additional Examples of Redirecting

Another very useful feature that React Router v4 gives us is the ability to easily redirect and render conditionally. This is essential for any kind of authentication or authorization, but it does require a bit more set up. Let's take a look at the example from the docs involving authentication: 

```js
import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const AuthButton = withRouter( props => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! 
      <button onClick={() => {
        fakeAuth.signout(() => props.history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({redirectToReferrer: true})
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/'} }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <h2>this.props.location</h2>
        <pre>
          {JSON.stringify(this.props.location, null, 4 )}
        </pre>
        <h2>this.state</h2>
        <pre>
          {JSON.stringify(this.state, null, 4)}
        </pre>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const AuthExample = () => (
  <Router>
    <div>
      <AuthButton></AuthButton>
      <ul>
        <li><Link to="/public">Public Page</Link></li>
        <li><Link to="/protected">Protected Page</Link></li>
      </ul>
      <Route path="/public" component={Public}></Route>
      <Route path="/login" component={Login}></Route>
      <PrivateRoute path="/protected" component={Protected}></PrivateRoute>
    </div>
  </Router>
)

render(<AuthExample />,
  document.getElementById('root')
);
```

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

