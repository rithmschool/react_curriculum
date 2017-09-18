#### [⇐ Previous](./02-testing_react.md) | [Table of Contents](./../readme.md) | [Next ⇒](./04-react_router_continued.md)

# React Router

### Objectives

By the end of this chapter, you should be able to:

- Define client side routing and the HTML 5 history API.
- Use `react-router` to build navigation for single page applications
- Diagram how the first load of a client side application works 

### Introduction To Single Page Applications

So far all of our react applications have been composed of a few components.  As our applications grow, we will need to change the components on the page.  Often the changes happen because of a link that was clicked or because of data that has been submitted.

Any client-side (JavaScript) application that has lots of different pages and transitions that happen without refreshing the page or rendering a new HTML file from the server is called a __single-page application__.  To make a single-page application well, the user should feel like the page still functions just like a standard server-based web app.  Specifically, the browser back button should still work.  Adding a bookmark to a specific page should still work.  Even the first page load should essentially work the same way (we'll talk more about this one later).

#### HTML 5 History API

So if JavaScript is doing all of the changes to the page, how can the browser back button still work?  The answer is the HTML 5 history API.  [MDN](https://developer.mozilla.org/en-US/docs/Web/API/History_API) has a good intro to history.  Assume you are on a site with the following url: `https://www.example.com`.  In your javascript you can change the history:

```js
// We can store some data we care about here
var state = { data: "value" };

// browser url will change to https://www.example.com/yoyo.html
window.history.pushState(state, "title not used right now", "yoyo.html");

// from javascript you can simulate clicking the browser back button
// The url in the browser will change back to https://www.example.com/
window.history.back();
```

If you want to build a single-page application in JavaScript and include routing using the browser's back button, you'll need to be using the history API. However, you'll rarely be interfacing with this API directly; typically you'll be using some other tool that abstracts away any direct interaction with the history API. In the case of React, the tool we use to enable routing is called `react-router`.

### Adding `react-router`

Some frameworks like Angular and Ember come with a router, but since React is a much smaller library, it does not have it's own router. To use client side routing with React, we're going to install a popular router called `react-router`. What's neat about `react-router` is that it has different kinds of routers for how you are using React. For web applications, you use `react-router-dom`, but if you're building applications in a different environment like React Native (using React to build mobile apps), the router you will install is different.

So let's get started with `react-router`! Let's first create an application using `create-react-app` then add `react-router-dom` to it.  In your terminal type the following:

```sh
create-react-app react-router-demo && cd react-router-demo
npm install --save react-router-dom
```

First, go to to the `src/index.js` file inside of your demo project.  We are going to wrap the `App` component with a router. The code should look like this:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
```

There are a few things to take note of here.  First, we imported `BrowserRouter` as `Router`.  The `BrowserRouter`, as the name implies, is a router designed for the browser. There are other types of routers you can import, but for now, the `BrowserRouter` is the only one we'll need.

Second, notice that our `App` component is now a child of `Router`.  Whenever you use React Router, you will need to wrap your application in a Router just like the example above.

### HashRouter vs BrowserRouter

With React Router there are quite a few router components that come with the module. Here is brief description on each one:

__Router__ - The common low-level interface for all router components. Higher-level routers include:

__BrowserRouter__ - A `<Router>` that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.

__HashRouter__ - A `<Router>` that uses the hash portion of the URL (i.e. window.location.hash) to keep your UI in sync with the URL. Using HashRouter will include a `#` in the URL. This is a fallback for older browsers when using `BrowserRouter`.

__NativeRouter__ - A `<Router>` for native iOS and Android apps built using React Native.

__MemoryRouter__ - A `<Router>` that keeps the history of your “URL” in memory (does not read or write to the address bar). Useful in tests and non-browser environments like React Native.

__StaticRouter__ - A `<Router>` that never changes location. This can be useful in server-side rendering scenarios when the user isn’t actually clicking around, so the location never actually changes. Hence, the name: static. It’s also useful in simple tests when you just need to plug in a location and make assertions on the render output.

To see the most obvious difference between `HashRouter` and `BrowserRouter`, let's change up our existing app so that import `HashRouter` in our `index.js` instead of `BrowserRouter`. When you use this router instead, you'll see that your URLs all have a hashtag (`#`) separating the host from the path. As we mentioned above, this can be useful as a fallback for older browsers that don't support the history API. For more on this, check out [this article](https://css-tricks.com/using-the-html5-history-api/) on the HTML5 history API.

### `BrowserRouter` fallback

In order to use BrowserRouter, we need to specify a fallback (what route to go to when a full refresh comes in (changing something in the browser bar)). This can be done in the `webpack.config.js` and is handled for us when using `create-react-app` - you can read more about it [here](https://webpack.github.io/docs/webpack-dev-server.html#the-historyapifallback-option).

In production, you may also need to configure your remote server with a `static.json` file that tells the server how to handle requests to routes other than the root. Here's what that file would look like:

```js
{
  "root": "build/",
  "routes": {
    "/**": "index.html"
  }
}
```

This tells your server to make the `build` directory your root, and to respond with the `index.html` file for every request. Without this file, if you deployed our example app and tried to go to `/name/tim`, the server would return a 404, since it doesn't know how to respond to this request! This is a route that only React Router understands.

By telling your server to respond to all requests with `index.html`, any requests made by manually entering an address in the URL bar are processed as follows:

1. A GET request is made to your server with the path in the URL bar;
2. Your server responds with `index.html`, which includes your bundled JavaScript files;
3. Once your JavaScript loads, React Router takes over and reads the URL in the URL bar;
4. Based on the current URL, React Router renders the appropriate components on the page.

### Adding Routes

Next, edit `src/App.js` to have the following (this example is taken from the [React Router docs](https://reacttraining.com/react-router/web/example/basic)) - you can head over to the docs and interact with this example as well. 

```js
import React from 'react';
import './App.css';
import {
  Route,
  Link
} from 'react-router-dom';

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
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    <Route exact path="/" component={Home}/>
    <Route path="/about" component={About}/>
  </div>
);

export default App;
```


We have used two new components from React Router:

__Route__ - this component tells the router what route triggers what component. We can give this component quite a few more props aside from `path`, and `component` - we will see more later.

__Link__ - this component is used for building anchor tags. `<a>` tags are not enough since we need some JavaScript to tell react-router about the new route. Use `<Link>` instead of `<a>`.

Try running the application and clicking on the links.  Notice that the address bar in the browser is changing.  If you open up your network tab in chrome developer tools and check for HTTP requests, you should see that nothing is happening on the network and that the browser is not reloading the page.

So how does this work?  Whenever you click on a `Link` component, react uses `window.history` to change the url in the address bar.  The `Route` component renders the component specified in the component attribute whenever the current url path matches the path attribute.

Notice that the `Route` for `path="/"` has the **exact** attribute.  That tells react router that you only want to match the route exactly.  Without the exact attribute, both components would be rendered when you click the `/about` link.

### URL Parameters and Query String

Just like we saw with server side programming, we can design routes with dynamic URL parameters and access them using the `match` object given to us by React Router. We can also access values in the query string using the `location` object given to us by React Router as well. Let's see what that looks like.

First, create a new file called `src/ParamsExample.js`.  Inside of `src/App.js`, add a new link for the new component we will build:

```js
import React from 'react';
import './App.css';
import ParamsExample from './ParamsExample'
import {
  Route,
  Link
} from 'react-router-dom';

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
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/name/tim">People</Link></li>
    </ul>
    <Route exact path="/" component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="/name" component={ParamsExample}/>
  </div>
);

export default App;
```

So we have added a `Link` to check out the people page.  We also render the `ParamsExample` for any path that starts with `/name` by adding the `Route` component.  In the `src/ParamsExample.js` file, add the following:


```js
import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';

const Instructor = ({ match, location }) => {
  const {name} = match.params;
  return (
    <div>
      <h3>Instructor Info For {name ? name : "No One" }</h3>
      <h4>What's in match? <pre>{JSON.stringify(match, null, 4)}</pre></h4>
      <h4>What's in location? <pre>{JSON.stringify(location, null, 4)}</pre></h4>
    </div>
  );
};

const ParamsExample = () => (
  <div>
    <h2>Instructors:</h2>
    <ul>
      <li><Link to="/name/elie">Elie</Link></li>
      <li><Link to="/name/matt">Matt</Link></li>
      <li><Link to="/name/tim">Tim</Link></li>
    </ul>
    <Route path="/name/:name" component={Instructor}/>
  </div>
);

export default ParamsExample;
```

In `src/ParamsExample.js`, we have 2 components: `ParmsExample` and `Instructor`.  The route renders an instructor component based the on the current path.  In the instructor component, you can see that we're rendering a few special props: `match` and `location`. When we pass a component into `Route` using the `component` prop, that component will render with `match` and `location` props that expose information about the current path, including any URL parameters.

#### Parsing the query string with React Router v4

React Router does not ship with a built in way to parse a query string so the recommended action is to use the `URLSearchParams` constructor in the browser. Here is what that might look like:

```js
let url = new URLSearchParams("https://rithmschool.com?
instructor=Michael&admissions=Angelina&partnerships=Kira")

url.get("admissions") // "Angelina"
```

You can see more about this [here](https://github.com/ReactTraining/react-router/issues/4410) and read about URLSearchParams [here](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

#### Passing information as props to a route

So far we have see how to route to other components, but what if we want to pass certain properties depending on what the parent component contains? Since components are just functions, we can pass a function to render the component with additional props! Let's see what that looks like

```js
import React from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";

const Home = props => (
  <div>
    <h2>Hello {props.name}! </h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const App = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
    <Route
      exact
      path="/"
      component={props => <Home name="Elie" {...props} />}
    />
    <Route path="/about" component={About} />
  </div>
);

export default App;
```

Notice here that we are passing a function as the value of the component prop. Since all of our components are functions anyway, we simply wrap our `<Home/>` component with a function! This is exactly the idea around higher order components. We're not explicitly creating a higher order component, but we are wrapping our component with a function that passes down props to the `<Home/>` component.

### Exercise

Complete the react router [Todo application](https://github.com/rithmschool/react_curriculum_exercises/blob/master/Unit-01/03-react-router/README.md)

#### [⇐ Previous](./02-testing_react.md) | [Table of Contents](./../readme.md) | [Next ⇒](./04-react_router_continued.md)

