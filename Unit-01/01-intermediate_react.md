#### [Table of Contents](./../readme.md) | [Next ⇒](./02-testing_react.md)

# Intermediate React

### Objectives

By the end of this chapter, you should be able to:

- Write more complex propTypes
- Define what a higher order component is 
- Understand additional tools that can be added for react codebases

### PropTypes

One of the nice features of React is the ability to create PropTypes for props in our components. PropTypes are an excellent way to ensure that we are using the correct type (string / integer / boolean) as well as add additional validation for our props (make sure they exist). These validations will **not**throw errors if they are not met, but will return warnings letting a user know that they are not being met. 

PropTypes are not only useful for yourself when building React applications, but since components are meant to be reused, they are essential for letting other developers know how exactly your components should be used. Let's start by creating a couple components with PropTypes. Let's first show what this code looks like using the React.createClass syntax (which we will **not** be using):

```jsx
import React, { Component } from "react";

export default class App extends Component {
  constructor(props, name, age, data) {
    super(props);
    this.name = name;
    this.age = age;
    this.data = data;
  }
  render() {
    return (
      <div>
        <h1>
          Hello {this.props.name} you are {this.props.age} years old
        </h1>
      </div>
    );
  }
}
App.propTypes = {
  name: React.PropTypes.string,
  age: React.PropTypes.number,
  data: React.PropTypes.object.isRequired
};

// to set default props we can do that outside the class
App.defaultProps = {
  age: 2
};

```

Now that we have an idea of how to add propTypes, let's see what kind of propTypes we can add 

```
  optionalArray: React.PropTypes.array,
  optionalBool: React.PropTypes.bool,
  optionalFunc: React.PropTypes.func,
  optionalNumber: React.PropTypes.number,
  optionalObject: React.PropTypes.object,
  optionalString: React.PropTypes.string,
  optionalSymbol: React.PropTypes.symbol,
  optionalElement: React.PropTypes.element,
```

We can even create our own types of objects with certain keys and values and use `React.PropTypes.shape({})` to customize our propTypes.

You can read more about them here  -[https://facebook.github.io/react/docs/typechecking-with-proptypes.html](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

### Higher Order Components

### Immutability

A bit more of an advanced topic in React is the use of immutable data structures when building larger applications. You can read more about it [here](http://reactkungfu.com/2015/08/pros-and-cons-of-using-immutability-with-react-js/), [here](http://jamesknelson.com/should-i-use-shouldcomponentupdate/) and [here](https://facebook.github.io/react/docs/optimizing-performance.html#using-immutable-data-structures)

### Type Checking with Flow

One tool that has been growing in popularity in the React community is Flow - a type checker created by Facebook. Since JavaScript is not staticly typed (you don't have to declare the type of a variable or parameter to a function), it becomes challenging to find certain bugs before runtime. What flow enables you to do is create or use types for your data so that if those types are not being used, an error will be thrown before your code even runs in the browser.  We will not be using Flow in our applications, but you can read more about it [here](https://flow.org/)

### Using Preact 

One other tool that has been growing in popularity in the React community is Preact, which is a much smaller (3kb) alternative to React with an almost identical API. Preact strips out some of the additional modules that ship with React that you don't use frequently to minimize the file size of the library. Switching to Preact involves a little bit of work to set up and you can read more about it [here](https://preactjs.com/guide/switching-to-preact)

### Additional Resources

[https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.52qvqdmg7](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.52qvqdmg7)

[https://www.sitepoint.com/react-higher-order-components/](https://www.sitepoint.com/react-higher-order-components/)

[https://camjackson.net/post/9-things-every-reactjs-beginner-should-know](https://camjackson.net/post/9-things-every-reactjs-beginner-should-know)

#### [Table of Contents](./../readme.md) | [Next ⇒](./02-react_router.md)
