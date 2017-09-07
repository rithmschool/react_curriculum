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
var FirstComponent = React.createClass({
    propTypes: {
        name: React.PropTypes.string
    }
});

// or 

var FirstComponent = React.createClass({});

FirstComponent.propTypes: {
    name: React.PropTypes.string
}

```

Using the second example, we can add propTypes in a similar fashion,

```jsx
import React, {Component} from 'react'

export default class App extends Component {

    static get propTypes() {
        return{
           name: React.PropTypes.string,
           age: React.PropTypes.number,
           data: React.PropTypes.object.isRequired
        }
     }

    constructor(props, name, age, data){
        super(props)
        this.name = name
        this.age = age
        this.data = data
    }
    render(){
        return(
                <div>
                    <h1>Hello {this.props.name} you are {this.props.age} years old</h1>
                </div>
            )
    }
}
// to set default props we can do that outside the class
App.defaultProps = {
    age: 2
}
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

### Types of Components

So far we have been creating almost all of our components using `class ___ extends React.component` or the ES5 `React.createClass` method. While this will work, it is not necessary for components that do not have state or "stateless" components. These components can be written as functions that render JSX and can accept props. These are known as [Stateless Functional Components](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components) and are often labeled as "dumb" components (which you can read more about [here](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.mlq5og2kx)). 

Using this structure, it is much easier to scale applications as its easy to discern between our presentation (presentational/components) and our stateful components (containers). You can read more about them [here](http://jaketrent.com/post/smart-dumb-components-react/)

### Folder Structure

Now that we have an idea of how to create different kinds of components and we have just started the conversation around building larger react applications - the next logical question becomes, "how do we organize our applications"? A very common approach is to place `actions`, `components`, `containers`, `reducers` in their own folders as an app scales. However, there are other approaches and you can read some thoughts on them [here](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1#.yx64ess6p), but

### Immutability

A bit more of an advanced topic in React is the use of immutable data structures when building larger applications. You can read more about it [here](http://reactkungfu.com/2015/08/pros-and-cons-of-using-immutability-with-react-js/), [here](http://jamesknelson.com/should-i-use-shouldcomponentupdate/) and [here](https://facebook.github.io/react/docs/optimizing-performance.html#using-immutable-data-structures)

### Additional Resources

[https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.52qvqdmg7](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.52qvqdmg7)

[https://www.sitepoint.com/react-higher-order-components/](https://www.sitepoint.com/react-higher-order-components/)

[https://camjackson.net/post/9-things-every-reactjs-beginner-should-know](https://camjackson.net/post/9-things-every-reactjs-beginner-should-know)

#### [Table of Contents](./../readme.md) | [Next ⇒](./02-react_router.md)
