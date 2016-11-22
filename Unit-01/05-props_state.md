#### [⇐ Previous](./04-components.md) | [Table of Contents](./../readme.md) | [Next ⇒](./06-events.md)

# Props + State

### Objectives

By the end of this chapter, you should be able to:

- Define what `props` is and how it is used with React
- Define what `state` is and how it is used with React
- Compare and contrast `props` and `state`

### Props

We have seen props earlier as values that are passed to our components (similar to attributes). Props can be defined on all of our components and can be passed down from parent to child component. The most important thing to understand about props are that they are **immutable**. Props can not be changed from within the component itself. This means that if we need to change our layout or add dynamic behavior, we will need something else (this is where state comes in).

Let's see how we can initialize props on our components.

### Initializing props

```js
import React, {Component} from 'react'
import {render} from 'react-dom'

class App extends Component {
    constructor(props, name){
        super(props)
        this.name = name
    }
    render(){
        return <div>
                 <h1>Hello {this.props.name}</h1>
               </div>
    }
}

render(<App name="Elie"/>, document.getElementById("main"))
```

### props.children

A special property that all react components have is called `children`. This allows for JSX to be placed inside of a component when it is rendered. 

```js
import React, {Component} from 'react'
import {render} from 'react-dom'

class Parent extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return <div>
                 <h1>Hi Kids!</h1>
                 {this.props.children}
               </div>
    }
}

class App extends Component {
    render(){
        return <Parent>
                 <h2>These are the children!</h2>
               </Parent>
    }
}

render(<App/>, document.getElementById("main"))
```

### State

Props are great when you want to pass data to a component that isn't changing. However, when building dynamic web applications, we often want something a little more flexible. As our applications change and become more complex, we need to have some kind of _state_ in the app. You may very often hear that "state is the root of all evil" and that is true to an extent, but it is often necessary when building applications. The reason why people are wary of including too much state in your application is that it adds complexity to your application. The more state you have to manage, the more difficult it becomes to reason about your application.

React does its best to make you think about the state you have and are changing in your application, especially when it comes to adding more state to the application. The syntax for including state in our `render` method is very similar to `props`: we use `{this.state}` instead of `{this.props}`.  To initialize state in our component we add `state` as property on the constructor. To change state we use the `this.setState()` method.

When state is changed, the `render` is called **again**. This is very important when we examine life cycle hooks as there are special methods we can tap into when state is about to change and has just changed.  

### Initializing state

Let's create some state!

```js
import React, {Component} from 'react'
import {render} from 'react-dom'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "Old"
        }
    }
    render(){
        return <div>
                 <h2>Our state is {this.state.name}</h2>
               </div>
    }
}

render(<App/>, document.getElementById("main"))

```

### Passing state down to child components as props

In order to minimize the amount of state in your application, it's very common for state to live in a parent component, and be passed to a child as props if the child component needs access to the state data. Here's an example: 

```js
import React, {Component} from 'react'
import {render} from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "Old"
    }
  }

  changeInfo() {
    this.setState(state => ({name: state.name === "Old" ? "New" : "Old"}))
  }

  render() {
    return (<div>
             <button onClick={this.changeInfo.bind(this)}>Change!</button>
             <h2>My state is {this.state.name}</h2>
             <Child name={this.state.name}/>
           </div>)
  }
}

class Child extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <h2>The parent state is {this.props.name}</h2>
  }
}

render(<App/>, document.getElementById("main"))
```

### Additional reading

At this point you may be thinking to yourself "Okay, so when should I use props and when should I use state?" Developing an intuition for when to use each is one of the most important parts of becoming a successful React developer. [This](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md) article (and the references therein) is a good place to start digging deeper.

### Exercise

Complete the [Props and State](https://github.com/rithmschool/react_curriculum_exercises/tree/master/Unit-01/04-props_state) exercise.


#### [⇐ Previous](./04-components.md) | [Table of Contents](./../readme.md) | [Next ⇒](./06-events.md)
