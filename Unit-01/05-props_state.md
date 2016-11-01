#### [⇐ Previous](./03-components.md) | [Table of Contents](./../readme.md) | [Next ⇒](./05-events.md)

# Props + State

### Objectives

By the end of this chapter, you should be able to:

- Define what `props` is and how it is used with React
- Define what `state` is and how it is used with React
- Compare and contrast `props` and `state`

### Props

### Initializing props

```js
import {Component} from 'react'
import {render} from 'react-dom'

class App extends Component {
    constructor(name){
        super()
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
import {Component} from 'react'
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

```js
import {Component} from 'react'
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

### Initializing state

### Passing state down to child components as props

### Exercise

#### [⇐ Previous](./03-components.md) | [Table of Contents](./../readme.md) | [Next ⇒](./05-events.md)