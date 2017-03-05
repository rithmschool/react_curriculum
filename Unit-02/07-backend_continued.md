#### [⇐ Previous](./06-backend.md) | [Table of Contents](./../readme.md) | [Next ⇒](./08-react_native.md)

# Authentication with React and Redux

### Objectives

By the end of this chapter, you should be able to:

- Build a SPA with Authentication
- Connect client side routing with an API 

### Authentication with React and JWTs

When a user logs in, we will store a token in localStorage and when they log out we will remove that token. When they make requests, we will place the token in an authorization header and send it on any follow request. We will also delete any header value on future requests once a user is logged out. We will use `axios` to handle this. 

#### Setting Up Actions

Before we focus on the `react` portion, let's think about our `redux` portion. We will want actions for the following:

`signup` - when this is dispatched, we will post to the server with the user data from a form. 
`login` - when this is dispatched, we will post to the server with the user data from a form and if the credentials are valid, the server will respond with a JWT which this action will place in localStorage. We will also dispatch another action to set our current user to the value of the token decoded 
`logout` - when this is dispatched we will remove a token from localStorage, delete any authorization headers and set our current user to be an empty object
`setting a current user` - this action will be dispatched by the login (setting the user as the value of the decoded token) and logout function (setting the user as an empty object).

Since we will be posting to the server, we will need to use `redux-thunk` to manage asynchronous actions:

```js
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

const BASE_URL = 'http://localhost:3001'

export function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export function signup(userData) {
  return dispatch => {
    return axios.post(`${BASE_URL}/api/users`, userData);
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return axios.post(`${BASE_URL}/api/users/auth`, data).then(res => {
      const token = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}
```

#### A simple rootReducer

In our reducer, the only action we will be working with is setting a current user. We will also store a property in our state to see if a user is authenticated which will be very helpful for our UI logic (and navbar as well)

```js
import { SET_CURRENT_USER } from './actions';

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {}
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        // turn an empty object into false or an object with keys to be true
        isAuthenticated: !!(Object.keys(action.user).length),
        user: action.user
      };
    default: 
      return state;
  }
}
```

#### Signup

```js
import React from 'react';
import { connect } from 'react-redux';
import { signup } from './actions';

class Signup extends React.Component {
  // pretty standard
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    // change a key in state with whatever the name attribute is
      // either username or password
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
      // make sure we use an arrow function here to correctly bind this to this.context.router
      this.props.signup(this.state).then(() =>{
          // route to /login once signup is complete
          this.context.router.push('/login');
        },
        // if we get back a status code of >= 400 from the server...
        (err) =>{
          // not for production - but good for testing for now!
          debugger
        });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
            <form onSubmit={this.onSubmit}>
              <h1>Sign up!</h1>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={this.state.username} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">password</label>
                <input type="password" id="password" name="password" value={this.state.password} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-lg">
                  Sign up
                </button>
              </div>
            </form>
        </div>
      </div>
    );
  }
}

Signup.contextTypes = {
  router: React.PropTypes.object.isRequired
}

Signup.propTypes = {
  signup: React.PropTypes.func.isRequired
}

export default connect(null,{ signup })(Signup);
```

#### Login

```js
import React from 'react';
import { connect } from 'react-redux';
import { login } from './actions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  onSubmit(e) {
    e.preventDefault();
      this.props.login(this.state).then(
        // make sure we use arrow functions to bind `this` correctly
        (res) => this.context.router.push('/welcome'),
        (err) => {
          debugger
        });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { username, password } = this.state;

    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>
        <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" value={password} onChange={this.onChange}/>
          </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      </div>
      </div>
    );
  }
}
// let's add some propTypes for additional validation and readability
LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}
// we NEED contextTypes to use `context`
LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}
// we do not want any state mapped to props, so let's make that first parameter to connect `null`
export default connect(null, { login })(LoginForm);
```

#### Authenticating / Authorizing Routes

Now that we have a simple log in working, let's think about how to make sure that someone who is not logged in can not get access to the login route. There are two ways of doing this, we can create a higher order component or create our own routes which check first to see if a user is authenticated.

#### Higher Order Components

The first option involves using something called a higher order component which is a function that wraps the creation of a component so that when a component is rendered, it is decorated with additional functionality. Let's take a look at a `requireAuth` higher order component. 

```js
import React, {Component} from 'react';
import { connect } from 'react-redux';

export default function(ComponentToBeRendered) {

  class Authenticate extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.context.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/login');
      }
    }

    render() {
      return (
        <ComponentToBeRendered {...this.props} />
      );
    }
  }

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.isAuthenticated
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
```

#### An Alternative - Creating Protected Routes

Another option available to us in React router v4 is the option of creating our own types of components which render a `<Route>` component that have a `render` prop of either `<Redirect>` or a Component, depending on if a user is authenticated

```js

// for authenticating users before
function PrivateRoute ({component: Component, isAuthenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

// for login/signup 
function PublicRoute ({component: Component, isAuthenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === false
        ? <Component {...props} />
        : <Redirect to='/welcome' />}
    />
  )
}
```

We can then add these routes with some `redux` state now:

```js
<Switch>
    <PublicRoute isAuthenticated={this.props.isAuthenticated} path='/login' component={Login} />
    <PublicRoute isAuthenticated={this.props.isAuthenticated} path='/register' component={Signup} />
    <PrivateRoute isAuthenticated={this.props.isAuthenticated} path='/dashboard' component={Welcome} />
    <Route render={() => <h3>404</h3>} />
</Switch>

function mapStateToProps(state){
    return {
        isAuthenticated: state.isAuthenticated
    }
}

connect(mapStateToProps)(App)
```

### Getting Started

#### [⇐ Previous](./06-backend.md) | [Table of Contents](./../readme.md) | [Next ⇒](./08-react_native.md)