#### [Table of Contents](./../readme.md) | [Next ⇒](./02-testing_react.md)

# Intermediate React

### Objectives

By the end of this chapter, you should be able to:

- Write more complex propTypes
- Define what a higher order component is 
- Understand additional tools that can be added for react codebases

### PropTypes

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
`React.PropTypes.node` | anything that can be rendered (all of the above)

We can even create our own types of objects with certain keys and values and use `PropTypes.shape({})` to customize our PropTypes.
We can also check if a prop is mapped to an instance of a class we have access to, for example `React.PropTypes.instanceOf(MyClass)`.

To read about more intermediate and advanced uses of `prop-types`, check out [this article from the React docs](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) and [this tutorial](https://themeteorchef.com/tutorials/what-are-proptypes#tmc-what-proptypes-are-available).

### Higher Order Components

One of the more powerful techniques you can use when building applications with React is have a component return a new component. The Facebook docs define a A higher-order component (HOC) as an advanced technique in React for reusing component logic.
HOCs are not part of the React API, they are a pattern that emerges from React's compositional nature.

Concretely, a higher-order component is a function that takes a component and returns a new component.
Higher order components are quite common in libraries we will see soon like React-Router and Redux. This behavior used to be accomplished with mixins which are an older and depricated feature of React.

To get started, follow along with the example [here](https://facebook.github.io/react/docs/higher-order-components.html).

### Type Checking with Flow

One tool that has been growing in popularity in the React community is Flow, which is a type checker created by Facebook. Since JavaScript is not staticly typed (you don't have to declare the type of a variable or parameter to a function), it becomes challenging to find certain bugs before runtime. What flow enables you to do is create or use types for your data so that if those types are not being used, an error will be thrown before your code even runs in the browser.  We will not be using Flow in our applications, but you can read more about it [here](https://flow.org/).

### Using Preact

Another tool that has been growing in popularity in the React community is Preact, which is a much smaller (3 KB minified) alternative to React with an almost identical API. Preact strips out some of the additional modules that ship with React that you don't use frequently to minimize the file size of the library. Switching to Preact involves a little bit of work to set up and you can read more about it [here](https://preactjs.com/guide/switching-to-preact).

### Immutability

A bit more of an advanced topic in React is the use of immutable data structures when building larger applications.
You can read more about it [here](http://reactkungfu.com/2015/08/pros-and-cons-of-using-immutability-with-react-js/), [here](http://jamesknelson.com/should-i-use-shouldcomponentupdate/) and [here](https://facebook.github.io/react/docs/optimizing-performance.html#using-immutable-data-structures).

### Additional Resources

[https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.52qvqdmg7](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.52qvqdmg7)

[https://www.sitepoint.com/react-higher-order-components/](https://www.sitepoint.com/react-higher-order-components/)

[https://camjackson.net/post/9-things-every-reactjs-beginner-should-know](https://camjackson.net/post/9-things-every-reactjs-beginner-should-know)

### Exercise

Complete the [Intermediate React Exercise](https://github.com/rithmschool/react_curriculum_exercises/blob/master/Unit-01/01-intermediate-react/README.md)

#### [Table of Contents](./../readme.md) | [Next ⇒](./02-react_router.md)
>>>>>>> Stashed changes
