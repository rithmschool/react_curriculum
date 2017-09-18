#### [Table of Contents](./../readme.md) | [Next ⇒](./02-testing_react.md)

# Intermediate React

## Objectives

By the end of this chapter, you should be able to:

- Write more complex PropTypes
- Understand additional tools that can be added for React codebases
- Define what a Higher Order Component is

## PropTypes

One of the nice features of React is the ability to create PropTypes for props in our components. PropTypes are an excellent way to ensure that we are using the correct type (string / integer / boolean) as well as add additional validation for our props (make sure they exist). These validations will **not** throw errors if they are not met, but will return warnings letting a user know that they are not being met.

PropTypes are not only useful for yourself when building React applications, but since components are meant to be reused, they are essential for letting other developers know how exactly your components should be used. Let's start by importing the PropTypes function and creating a component with PropTypes.

To begin, create a new react project, and then import the `prop-types` module. This used to be built-in with React, but as of React version 15, it has been pulled out into a separate module.

```sh
npm i prop-types
```

Once you've installed `prop-types`, modify your `App.js` as follows:

```jsx
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>
          Hello {this.props.name}, you are {this.props.age} years old.
        </h1>
      </div>
    );
  }
}

App.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  data: PropTypes.object.isRequired
};

```

Then, in your `index.js`, pass in a name and an age as props:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App name="Alice" age={30} />, document.getElementById("root"));
registerServiceWorker();

```

If you start this app and head to the console, you'll see a warning because we didn't specify a `data` prop, even though we said it should be required!

There are many `prop-types` that you can add, all of which are members of the `React.PropTypes` object. Each prop type maps to a builtin JavaScript or React data structure. These include:

| Prop Type | Mapping
--- | ---
`React.PropTypes.array` | [Array global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
`React.PropTypes.bool` | [Boolean primitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
`React.PropTypes.func`  | [Function global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
`React.PropTypes.number` | [Number primitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
`React.PropTypes.object` | [Object primitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
`React.PropTypes.string` | [String primitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
`React.PropTypes.symbol` | [Symbol primitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
`React.PropTypes.element` | [React element](https://facebook.github.io/react/docs/rendering-elements.html)
`React.PropTypes.node` | anything that can be rendered (element, number, string, etc.)

We can even create our own types of objects with certain keys and values and use `PropTypes.shape({})` to customize our PropTypes.
We can also check if a prop is mapped to an instance of a class we have access to, for example `React.PropTypes.instanceOf(MyClass)`.

To read about more intermediate and advanced uses of `prop-types`, check out [this article from the React docs](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) and [this tutorial](https://themeteorchef.com/tutorials/what-are-proptypes#tmc-what-proptypes-are-available).

## Type Checking with Flow

Remember how JavaScript is a weakly-typed and dynamically-typed? In other words, you never have to declare your variables as `int` or `object` as in statically-typed languages such as Java.
 Well, doing type validation with `prop-types` is the first step in imposing a stronger typing system onto JavaScript.

As you can imagine, type validation has bug-prevention uses outside of just prop validation in React components. As such, many developers use type-checking tool such as [Flow](https://flow.org/) or [TypeScript](https://www.typescriptlang.org/).
These tools are roughly equivalent and can both be used with React, but Flow is much more popular amongst the React community because it is maintained by Facebook and integrates very smoothly with React (in fact, it started as an internal tool for React devs), whereas TypeScript is by Microsoft.
Both tools have their own special syntax (which looks quite different than vanilla JS) which is removed at compile-time.

A nice bonus is that if you use Flow, you never have to do your own prop type validation on components!

We won't be utilizing Flow in this session, but it is a widely-used and increasingly-popular tool that we recommend learning on your own.

## Using Preact

Another tool that has been growing in popularity in the React community is Preact, which is a much smaller (3 KB minified) alternative to React with an almost identical API.
 Preact strips out some of the additional modules that ship with React that you don't use frequently to minimize the file size of the library. Switching to Preact involves a little bit of work to set up and you can read more about it [here](https://preactjs.com/guide/switching-to-preact).

## Higher Order Components

One of the more powerful techniques you can use when building applications with React is have a component return a new component. The Facebook docs define a A higher-order component (HOC) as an advanced technique in React for reusing component logic.
HOCs are not part of the React API, they are a pattern that emerges from React's compositional nature.

Concretely, a higher-order component is a function that takes a component and returns a new component.
Higher order components are quite common in libraries we will see soon like React-Router and Redux. This behavior used to be accomplished with mixins which are an older and depricated feature of React.

To get started, follow along with the example [here](https://facebook.github.io/react/docs/higher-order-components.html).

## Immutability

A bit more of an advanced topic in React is the use of immutable data structures when building larger applications.
You can read more about it [here](http://reactkungfu.com/2015/08/pros-and-cons-of-using-immutability-with-react-js/), [here](http://jamesknelson.com/should-i-use-shouldcomponentupdate/) and [here](https://facebook.github.io/react/docs/optimizing-performance.html#using-immutable-data-structures).

## Additional Resources

[https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.52qvqdmg7](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.52qvqdmg7)

[https://www.sitepoint.com/react-higher-order-components/](https://www.sitepoint.com/react-higher-order-components/)

[https://camjackson.net/post/9-things-every-reactjs-beginner-should-know](https://camjackson.net/post/9-things-every-reactjs-beginner-should-know)

#### [Table of Contents](./../readme.md) | [Next ⇒](./02-testing_react.md)
