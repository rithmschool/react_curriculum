#### [⇐ Previous](./02-testing.md) | [Table of Contents](./../readme.md) | [Next ⇒](./04-redux_intro.md)

# React Router

### Objectives

By the end of this chapter, you should be able to:

- Use `react-router` to build navigation for single page applications
- Compare and contrast client-side and server-side routing

### Introduction

As we want to navigate to more pages, we can use JavaScript to add and remove elements to give the idea of a single page feel, but what happens when the user clicks the back button in the browser, or refreshes the page! All of our history and state is lost so it would be nice if we could use JavaScript to be able to change the URL and give the "illusion" of navigation even though it is all one single HTML page (with modifications to the DOM).

The API commonly used to do this is the `history` API, which is a JavaScript web API. React router is a wrapper around this that uses React components for routes, anchor tags and much more. 

### Essential Components

#### <Router></Router>
#### <Route / >
#### <Link / >

### Getting Started

Before we see the router components Let's first build a simple React application with webpack.

```sh
take learn_react_router
npm init -y
npm install --save babel-core babel-loader babel-preset-es2015 babel-preset-react react react-dom react-router
touch webpack.config.js .babelrc index.html
mkdir src
touch src/index.js
mkdir src/components
touch src/components/App.js
```

Now let's create a `webpack.config.js` and `babelrc`.

Now let's get started importing react-router

```js
import {Router, Route, hashHistory} from 'react-router'
import React, {Component} from 'react'
import {render} from 'ReactDom'

class First extends Component {
    render(){
        return(
                <div>
                    <h1>Hello Router!</h1>
                </div>
            )
    }
}

const Second = () => <h1>Hello Second!</h1>

const App = () => (
    <Router history={hashHistory}>
        <Route path='/' component={First}></Route>
        <Route path='/second' component={Second}></Route>
    </Router>
    )

render(<App/>, document.getElementById('app'))
```

### Hash History + Browser History

```js
import {Router, Route, hashHistory} from 'react-router'
import {Component} from 'react'
import {render} from 'react-dom'

class First extends Component {
    render(){
        return(
                <div>
                    <h1>Hello Router!</h1>
                </div>
            )
    }
}

const Second = () => <h1>Hello Second!</h1>

const App = () => (
    <Router history={hashHistory}>
        <Route path='/' component={First}></Route>
        <Route path='/second' component={Second}></Route>
    </Router>
    )

render(<App/>, document.getElementById('app'))
```

### BrowserHistory

If you would like to remove the `/#/` in the URL, we can use `browserHistory` instead of `hashHistory`. 

`import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'

`<Router history={browserHistory}>`

`webpack-dev-server --inline --content-base . --history-api-fallback`

### Linking routes

```js
import {Link} from 'react-router'

const Main = () => {
    return(
        <div>Hello from main!
            <Link to='/first'>First</Link> |
            <Link to='/second'>Second</Link>
        </div>
        )
    }
```

### 404
const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

`<Route path='*' component={NotFound} />`

### Nested Routes

When using nested routes, make sure the parent route contains {this.props.children} or {props.children} if using a simple component.

```js
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import React, {Component} from 'react'
import {render} from 'react-dom'

class First extends Component {
    render(){
        return(
                <div>
                    <h1>Hello Router!</h1>
                </div>
            )
    }
}

const Inner = () => <h1>Hello Inner!</h1>
const Another = () => <h1>Hello Another!</h1>

const App = () => (
    <Router history={hashHistory}>
        <Route path='/' component={First}>
            <IndexRoute component={Inner} />
            <Route path='/' component={Another} />
        </Route>
        <Route path='/second' component={Second}></Route>
    </Router>
    )

render(<App/>, document.getElementById('app'))
```

### Active Links

### Index Routes + Links

const Users = (props) => {
    return(
            <div>
                <Link activeStyle={{ color: 'red' }} to='/first'>First</Link> |
                <Link activeStyle={{ color: 'red' }} to='/second'>Second</Link>
                <Link activeStyle={{ color: 'red' }} to='/users/Elie'>Elie</Link>
                <Link activeClassName="active" to='/users/Matt'>Matt</Link>
                <Link activeClassName="active" to='/users/Tim'>Tim</Link>
                <h1>Hello Users!</h1>
                {props.children}
            </div>
        )
}

### URL Parameters and Query String access

If we want url parameters we can add a `/:NAME_OF_PARAM`

```js

import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import React, {Component} from 'react'
import {render} from 'react-dom'

const App = () => (
    <Router history={hashHistory}>
        <Route path='/' component={First}></Route>
        <Route path='/details/:name' component={Info}></Route>
    </Router>
    )

render(<App/>, document.getElementById('app'))
```

### Passing information from a parent route to child route

With the Router, we may think it's a good idea to pass information from parent routes to child routes, but this is not something that is easy to do. 

### Route Hooks

```js

import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import React, {Component} from 'react'
import {render} from 'react-dom'

const First = () => <div>Hello from First!</div>
const Info = (props) => <div>Hello {props.params.name}!</div>

class App extends Component {
    sayHello(nextState, data){
        console.log("HELLO!")
        debugger
    }
    render(){
        return(
                <Router history={hashHistory}>
                    <Route path='/' component={First}></Route>
                    <Route path='/details/:name' component={Info} onEnter={this.sayHello}></Route>
                </Router>s
            )
        }
    )
}
  

render(<App/>, document.getElementById('app'))
```

**onEnter** - You can add this hook to run when a route happens. This is very useful for authentication and ensuring only certain users can access certain routes.

### Exercise

#### [⇐ Previous](./02-testing.md) | [Table of Contents](./../readme.md) | [Next ⇒](./04-redux_intro.md)