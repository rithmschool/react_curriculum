#### [⇐ Previous](./02-react_router.md) | [Table of Contents](./../readme.md) | [Next ⇒](./04-redux_intro.md)

### Redirecting / Auth

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

### Route Config

Another common pattern is to store all of your route configuration in a single location. Here's an example of what that looks like: 

```js
import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

////////////////////////////////////////////////////////////
// first our route components

const Main = () => <h2>Main</h2>

const Sandwiches = () => <h2>Sandwiches</h2>

const Tacos = ({ routes }) => (
  <div>
    <h2>Tacos</h2>
    <ul>
      <li><Link to="/tacos/bus">Bus</Link></li>
      <li><Link to="/tacos/cart">Cart</Link></li>
    </ul>

    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route}/>
    ))}
  </div>
)

const Bus = () => <h3>Bus</h3>

const Cart = () => <h3>Cart</h3>

////////////////////////////////////////////////////////////
// then our route config
const routes = [
  { path: '/main',
    component: Main
  },
  { path: '/sandwiches',
    component: Sandwiches
  },
  { path: '/tacos',
    component: Tacos,
    routes: [
      { path: '/tacos/bus',
        component: Bus
      },
      { path: '/tacos/cart',
        component: Cart
      }
    ]
  }
]

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes} />
  )}/>
)

const RouteConfigExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/main">Main</Link></li>
        <li><Link to="/sandwiches">Sandwiches</Link></li>
        <li><Link to="/tacos">Tacos</Link></li>
      </ul>

      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}
    </div>
  </Router>
)

render(
  <RouteConfigExample/>, 
  document.getElementById('root')
)
```

### Sidebar 

So far we've been associating one component per path via the `component` prop. But we can associate multiple components for a given path using differently named props. Here's an example where each path is associated with two different components, a sidebar and a main (again, taken from the docs):

```js
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  { path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  { path: '/bubblegum',
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>
  },
  { path: '/shoelaces',
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
]

const SidebarExample = () => (
  <Router>
    <div style={{ display: 'flex' }}>
      <div style={{
        padding: '10px',
        width: '40%',
        background: '#f0f0f0'
      }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/bubblegum">Bubblegum</Link></li>
          <li><Link to="/shoelaces">Shoelaces</Link></li>
        </ul>

        {routes.map((route, index) => (
          // You can render a <Route> in as many places
          // as you want in your app. It will render along
          // with any other <Route>s that also match the URL.
          // So, a sidebar or breadcrumbs or anything else
          // that requires you to render multiple things
          // in multiple places at the same URL is nothing
          // more than multiple <Route>s.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.sidebar}
          />
        ))}
      </div>

      <div style={{ flex: 1, padding: '10px' }}>
        {routes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    </div>
  </Router>
)

export default SidebarExample
```

### Redirecting Programatically

With react router v4 we are given access to the `Redirect` component which is useful for conditionally rendering or redirecting, but if we need to redirect programatically (after a form submission, click, and so on) we can use `context` to do that. 

This can also be done with `state`. In this case, we can set `this.state.redirect` to `false` if nothing has changed, and we can set it to `true` and redirect to another component if something has changed. However, this example will show you how to redirect using an object called `context`, which you should almost never be manipulating on your own, it is internal to React and you can read more about it [here](https://facebook.github.io/react/docs/context.html)

For now, let's see an example of redirecting with `context`. You will also see in order to make this work, we need to add `contextTypes` as a `static` property to our `class`. 

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

### Exercises

Complete the react router [makeup mega market application](https://github.com/rithmschool/react_curriculum_exercises/blob/master/Unit-02/01-react-router/README.md)

Once you've completed that, try refactoring your todo application.  Use the router for the following routes:

- `/todos` - list all of your todos
- `/todos/new` - render a form to create a new todos
- `/todos/:id` - list a single todo
- `/todos/:id/edit` - render a form to edit an existing todo

When a user creates, updates or deletes a todo - they should be redirected to the `/todos` page.


#### [⇐ Previous](./02-react_router.md) | [Table of Contents](./../readme.md) | [Next ⇒](./04-redux_intro.md)

