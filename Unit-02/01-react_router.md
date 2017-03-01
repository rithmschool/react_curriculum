#### [Table of Contents](./../readme.md) | [Next ⇒](./02-redux_intro.md)

# React Router

### Objectives

By the end of this chapter, you should be able to:

- Use `react-router` to build navigation for single page applications
- Compare and contrast client-side and server-side routing

### Introduction

As we want to navigate to more pages, we can use JavaScript to add and remove elements to give the idea of a single page feel, but what happens when the user clicks the back button in the browser, or refreshes the page! All of our history and state is lost so it would be nice if we could use JavaScript to be able to change the URL and give the "illusion" of navigation even though it is all one single HTML page (with modifications to the DOM).

The API commonly used to do this is the `history` API, which is a JavaScript web API. React router is a wrapper around this that uses React components for routes, anchor tags and much more. 

React Router is quite helpful when building more robust applications with multiple components and views. 

### React Router Version

React Router has gone through quite a few changes since its first version and a new version, `v4` is in beta. We will be learning `v4` since it is the future of react-router and it is a bit easier to use than previous versions.

### Getting Started with create-react-app

To get started with react apps a bit quicker, we will be using a generator called `create-react-app` which can be installed with `npm install -g create-react-app`. 

To generate an app simply run `create-react-app NAME_OF_APP` and then `cd NAME_OF_APP` and run `npm start` and a browser window will pop up with page to describe what to do next!

### Adding react-router

Now let's get started with react-router by running `npm install react-router@next`. Most of these examples are taken from [here](https://reacttraining.com/react-router/). 

```js
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
```

Here we are importing three essential components

__BrowserRouter__ - this component wraps our entire application and contains routes.
__Route__ - this component tells the router what route triggers what component. We can give this component quite a few more props aside from `path`, and `component` - we will see more later ( we can even render )
__Link__ - this component is used for building anchor tags. `<a>` tags are not enough since we need some javascript to tell react-router about the new route. Use `<Link>` instead of `<a>`.

### Basic Routing

Once these three components are imported, it's quite easy to get up and running with react-router - we can create a few components and map some routes to them!

```js
import React from 'react'
import {render} from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </div>
  </Router>
)

render(<App/>, document.getElementById('app'))
```

### URL Parameters and Query String

Just like we saw with server, side programming, we can design routes with dynamic URL parameters and access them using the `match` object given to us by react router and we can access values in the query string using the `location` object given to us by react router as well. Let's see what that looks like

```js
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Instructor = ({ match, location }) => (
  <div>
    <h3>What's in match? <pre>{JSON.stringify(match, null, 4)}</pre></h3>
    <h3>What's in location? <pre>{JSON.stringify(location, null, 4)}</pre></h3>
  </div>
)


const ParamsExample = () => (
  <Router>
    <div>
      <Route exact path="/" component={Person}/>
      <h2>Accounts</h2>
      <ul>
        <li><Link to="/elie">Elie</Link></li>
        <li><Link to="/matt">Matt</Link></li>
        <li><Link to="/tim">Tim</Link></li>
      </ul>
      <Route path="/:name" component={Instructor}/>
    </div>
  </Router>
)

export default ParamsExample
```

You can also see above that one of our routes has an `exact` prop, which specifies that we should only display that route if the "exact" match exists and not a relative match. If we do not specify "exact" on a route like `/`, then any route that starts with a `/` will include whatever component we render. Try to remove the `exact` prop and see what it does!

### HashRouter vs BrowserRouter

With ReactRouter there are quite a few Router components that come with the module. Here is brief description on each one

__Router__ - The common low-level interface for all router components. Higher-level routers include:

- __BrowserRouter__ - A <Router> that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.
- __HashRouter__ - A <Router> that uses the hash portion of the URL (i.e. window.location.hash) to keep your UI in sync with the URL. Using HashRouter will include a `#` in the URL. This is a fallback for older browsers when using `BrowserRouter`
__NativeRouter__ - A <Router> for native iOS and Android apps built using React Native.
__MemoryRouter__ - A <Router> that keeps the history of your “URL” in memory (does not read or write to the address bar). Useful in tests and non-browser environments like React Native.
__StaticRouter__ - A <Router> that never changes location. This can be useful in server-side rendering scenarios when the user isn’t actually clicking around, so the location never actually changes. Hence, the name: static. It’s also useful in simple tests when you just need to plug in a location and make assertions on the render output.

In order to use BrowserRouter, we need to specify a fallback (what route to go to when a full refresh comes in (changing something in the browser bar)). This can be done in the `webpack.config.js` and is handled for us when using `create-react-app` - you can read more about it [here](https://webpack.github.io/docs/webpack-dev-server.html#the-historyapifallback-option)

Let's see what these two examples look like:

```js
import React from 'react'
import {
  BrowserRouter as BRouter,
  HashRouter as HRouter,
  Route,
  Link
} from 'react-router-dom'


const RouterExample = () => (
  <HRouter>
    <div>
      <h2>Look at the URL!</h2>
    </div>
  </HRouter>
)

export default RouterExample
```

### Redirecting / Auth

Another very useful feature that react router v4 gives us is the ability to easily redirect and render conditionally. This is essential for any kind of authentication or authorization, but it does require a bit more set up. Let's take a look at the example from the docs: 

```js
import React, { PropTypes } from 'react'
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

const AuthExample = () => (
  <Router>
    <div>
      <AuthButton/>
      <ul>
        <li><Link to="/public">Public Page</Link></li>
        <li><Link to="/protected">Protected Page</Link></li>
      </ul>
      <Route path="/public" component={Public}/>
      <Route path="/login" component={Login}/>
      <PrivateRoute path="/protected" component={Protected}/>
    </div>
  </Router>
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const AuthButton = withRouter(({ push }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => push('/'))
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
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
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

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

export default AuthExample
```

There is quite a lot going on here including some new components and functions:

__withRouter__ - You can get access to the router object’s properties via the withRouter higher-order component. This is the recommended way to access the router object. withRouter will re-render the component every time the route changes.

__Redirect__ - Useful for redirecting, you just have to specify the to prop to tell the router where to go next.

`{...rest}`  - The rest/spread operator for objects is a useful way to spread or list the remaining/rest keys and values in an object with just one parameter. You can read more about it [here](https://babeljs.io/docs/plugins/transform-object-rest-spread/)

### Route Config

```js
import React from 'react'
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
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>
  )}/>
)

const RouteConfigExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/tacos">Tacos</Link></li>
        <li><Link to="/sandwiches">Sandwiches</Link></li>
      </ul>

      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}
    </div>
  </Router>
)

export default RouteConfigExample
```

### Sidebar 

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

With react router v4 we are given access to the `Redirect` component which is useful for conditionally rendering or redirecting, but if we need to redirect programatically (after a form submission, click) we can use `context` to do that. This can also be done with `state` and having something like `this.state.redirect` be set to `false` unless something has changed, and if so - change `this.state.redirect` to be `true` and redirect to another component. However, this example will show you how to redirect using an object called `context`, which you should almost never be manipulating on your own, it is internal to React and you can read more about it [here](https://facebook.github.io/react/docs/context.html)

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

export default ContextExample
```

### Exercises

Build a simple todo application but use the router for the following routes:

- `/todos` - list all of your todos
- `/todos/new` - render a form to create a new todos
- `/todos/:id` - list a single todo
- `/todos/:id/edit` - render a form to edit an existing todo

When a user creates, updates or deletes a todo - they should be redirected to the `/todos` page.

#### [Table of Contents](./../readme.md) | [Next ⇒](./02-redux_intro.md)