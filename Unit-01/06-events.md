#### [⇐ Previous](./04-props_state.md) | [Table of Contents](./../readme.md) | [Next ⇒](./06-refs_forms.md)

# Events

### Objectives

By the end of this chapter, you should be able to:

- Compare and contrast events and synthetic events
- Build React applications with events

### Events with React

Events in React are not actually `DOM` events they are called `synthetic` events. They React event API is almost identical to the DOM API in its methods, but they are not exactly the same.

```js
import React, {Component} from 'react'
import {render} from 'react-dom'

class App extends Component {
    handleClick(){
        alert("click!")
    }
    render(){
        <div>
            <button onClick={this.handleClick}></button>
            <h2>These are the children!</h2>
        </div>
    }
}

render(</App>, document.getElementById("main"))
```

### Binding with `this`

import React, {Component} from 'react'
import {render} from 'react-dom'

class App extends Component {
    constructor(props,name){
        super(props)
        this.name = name
        this.printName = this.printName.bind(this)
    }
    handleName(){
        alert("click!")
    }
    render(){
        <div>
            <button onClick={this.handleName}>{this.props.name}</button>
            <h2>These are the children!</h2>
        </div>
    }
}

### Accessing the event object

### Exercise

#### [⇐ Previous](./04-props_state.md) | [Table of Contents](./../readme.md) | [Next ⇒](./06-refs_forms.md)