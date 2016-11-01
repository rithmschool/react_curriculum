#### [⇐ Previous](./04-props_state.md) | [Table of Contents](./../readme.md) | [Next ⇒](./06-refs_forms.md)

# Events

### Objectives

By the end of this chapter, you should be able to:

- Compare and contrast events and synthetic events
- Build React applications with events

### Events with React

```js
import {Component} from 'react'
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

### Accessing the event object

### Exercise

#### [⇐ Previous](./04-props_state.md) | [Table of Contents](./../readme.md) | [Next ⇒](./06-refs_forms.md)