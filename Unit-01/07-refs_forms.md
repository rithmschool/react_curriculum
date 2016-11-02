#### [⇐ Previous](./06-events.md) | [Table of Contents](./../readme.md) | [Next ⇒](./08-lifecycle.md)

# Forms and Refs

### Objectives

By the end of this chapter, you should be able to:

- Understand what `refs` are and how to use them
- Compare and contrast using `state` versus using `refs`

### Refs

So far, we have seen that the only for a parent component to pass information to a child component are through re-rendering a child component with `props`  However, there are a few cases where you need to modify a child outside of the typical dataflow. The child to be modified could be a component, or DOM element. 

For both of these cases, React provides a tool called `refs` to help. However, be aware that this is not something you should be using frequently. When coming from a library like `jQuery`, it is easy to think that using `refs` is the way to get things done with React, but anytime that you are adding a `ref`, ask yourself "Can I do this using state?"

Let's see some examples of what a `ref` looks like:

```js
import React from 'react'

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.printInfo = this.printInfo.bind(this)
        this.state = {
            name: ''
        }
    }
    printInfo(e){
        e.preventDefault()
        const name = `${this.refs.first.value} ${this.refs.last.value}`
        this.setState({name})
        e.target.reset()
    }
    render(){
        return (
            <div>
                <h1>Your name is {this.state.name}</h1>
                <form onSubmit={this.printInfo}>
                    <input type="text" name="firstName" ref="first"/>
                    <input type="text" name="lastName" ref="last"/>
                    <input type="submit" value="Add me!"/>
                </form>
            </div>

            )
    }
}
```

### The ref callback

```js
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in this.textInput.
    return (
      <div>
        <input
          type="text"
          ref={(input) => this.textInput = input} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focus}
        />
      </div>
    );
  }
}
```

### getDOMNode()

In some tutorials you may see a method called `getDOMNode`, this is deprecated and should **not** be used. You can learn more about the changes [here](http://stackoverflow.com/questions/30190608/react-js-the-difference-between-finddomnode-and-getdomnode)

### When not to use refs

Your first inclination may be to use refs to "make things happen" in your app. If this is the case, take a moment and think more critically about where state should be owned in the component hierarchy. Often, it becomes clear that the proper place to "own" that state is at a higher level in the hierarchy.

[http://stackoverflow.com/questions/29503213/use-state-or-refs-in-react-js-form-components](http://stackoverflow.com/questions/29503213/use-state-or-refs-in-react-js-form-components)

### Additional Resources

[http://reactkungfu.com/2015/09/common-react-dot-js-mistakes-unneeded-state/](http://reactkungfu.com/2015/09/common-react-dot-js-mistakes-unneeded-state/)

### Exercise

#### [⇐ Previous](./06-events.md) | [Table of Contents](./../readme.md) | [Next ⇒](./08-lifecycle.md)