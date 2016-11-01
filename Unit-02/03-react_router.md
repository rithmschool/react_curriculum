#### [⇐ Previous](./03-testing.md) | [Table of Contents](./../readme.md) | [Next ⇒](./05-redux_intro.md)

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
import {Component} from 'react'
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

You **must** have a server configured for browserHistory to work - we'll come back to this.

### Linking routes

```js
import {Link} from 'react-router'
```

### 404

### Nested Routes

```js
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
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

### URL Parameters and Query String access

### Passing information from a parent route to child route

### Exercise

#### [⇐ Previous](./03-testing.md) | [Table of Contents](./../readme.md) | [Next ⇒](./05-redux_intro.md)