#### [⇐ Previous](./04-components.md) | [Table of Contents](./../readme.md) | [Next ⇒](./06-events.md)

# Props + State

### Objectives

By the end of this chapter, you should be able to:

- Define what `props` is and how it is used with React
- Define what `state` is and how it is used with React
- Compare and contrast `props` and `state`

### Props

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
        <div>
            <h1>Hello {this.props.name}</h1>
        </div>
    }
}

render(</App name="Elie">, document.getElementById("main"))

```

### props.children

```js
import React, {Component} from 'react'
import {render} from 'react-dom'

class Parent extends Component {
    constructor(){
        super()
    }
    render(){
        <div>
            <h1>Hi Kids!</h1>
            {this.props.children}
        </div>
    }
}

class App extends Component {
    render(){
        <Parent>
            <h2>These are the children!</h2>
        </Parent>
    }
}

render(</App>, document.getElementById("main"))

```

### State

As our applications change, we need to have some kind of state in the app. You may very often hear that "state is the root of all evil" and that is true to an extent, but it is often necessary when building applications. React does its best to make you think about the state you have and are changing in your application. The syntax for including state in our `render` method is very similar to `props` using `{this.state}` instead of `{this.props}`.  To initialize state in our component we add `state` as property on the constructor. To change state we use the `this.setState()` method.

When state is changed, the `render` is called **again**. This is very important when we examine life cycle hooks as there are special methods we can tap into when state is about to change and has change.  

### Initializing state

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
        <div>
            <h2>Our state is {this.state.name}</h2>
        </div>
    }
}

render(</App>, document.getElementById("main"))

```

### Passing state down to child components as props

```js
import React, {Component} from 'react'
import {render} from 'react-dom'

class App extends Component {
    constructor(){
        this.state = {
            name: "Old"
        }
    }
    changeInfo(){
        this.setState({
            name: "New"
        })
    }
    render(){
        <div>
            <button onClick={this.changeInfo}>Change!</button>
            <h2>Our state is {this.state.name}</h2>
        </div>
    }
}

render(</App>, document.getElementById("main"))
```

### Exercise



#### [⇐ Previous](./04-components.md) | [Table of Contents](./../readme.md) | [Next ⇒](./06-events.md)