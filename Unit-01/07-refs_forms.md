#### [⇐ Previous](./06-events.md) | [Table of Contents](./../readme.md) | [Next ⇒](./08-lifecycle.md)

# Forms and Refs

### Objectives

By the end of this chapter, you should be able to:

- Understand what `refs` are and how to use them
- Compare and contrast using `state` versus using `refs`

### Refs

So far, we have seen that the only for a parent component to pass information to a child component are through re-rendering a child component with `props`. Sometimes, however, you may want to re-render a child without having to set state on the parent. In most cases, this is how you should think of data flowing through your application, but in exceptional cases you can use a concept called `refs`. 

Be aware that `refs` are not something you should be using frequently. When coming from a library like `jQuery`, it is easy to think that using `refs` is the way to get things done with React, but anytime that you are adding a `ref`, ask yourself "Can I do this using state?"

To learn more about `refs`, including exploring some use cases, you can always head to the [docs](https://facebook.github.io/react/docs/refs-and-the-dom.html). For now, let's look at an example.

First, let's take a look at a component that doesn't use `refs`:

```js
import React from 'react'
import {render} from 'react-dom'

class SecurityForm extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        pin: '',
        error: false
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.pin === '1234') {
      alert("Thanks for the pin!")
      this.setState({pin: ''})
    } else {
      this.setState({pin: '', error: true})
    }
  }

  handleChange(e) {
    this.setState({pin: e.target.value, error: false})
  }

  render(){
    let error = (this.state.error) ?
      <p>Wrong. Please Try again.</p> :
      null;
    return (
      <form onSubmit={this.handleSubmit}>
          <label>Enter your pin:</label>
          <input type="text" value={this.state.pin} onChange={this.handleChange}/>
          <button type="submit">Enter</button>
          {error}
      </form>
    )
  }
}

render(<SecurityForm/>, document.getElementById("app"))
```

This app has a single component, a form that prompts the user to enter their pin code. If the pin is wrong, the user is prompted to try again. 

However, after the form is submitted, the input field loses focus. It would be nice if we could automatically give focus to the input if the user supplies the wrong pin. Here's an example of where `refs` can be useful, as it can supply us with a reference to the DOM element that we can then apply focus to.

Here's a solution to the problem:

```js
import React from 'react'
import {render} from 'react-dom'

class SecurityForm extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        pin: '',
        error: false
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.addFocus = this.addFocus.bind(this);
  }

  addFocus() {
    this.input.focus();
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.pin === '1234') {
      alert("Thanks for the pin!")
      this.setState({pin: ''})
    } else {
      this.setState({pin: '', error: true})
      this.addFocus();
    }
  }

  handleChange(e) {
    this.setState({pin: e.target.value, error: false})
  }

  render(){
    let error = (this.state.error) ?
      <p> Wrong. Please Try again.</p> :
      null;
    return (
      <form onSubmit={this.handleSubmit}>
          <label>Enter your pin:</label>
          <input type="text" 
            value={this.state.pin} 
            onChange={this.handleChange}
            ref={el => this.input = el}
          />
          <button type="submit">Enter</button>
          {error}
      </form>
    )
  }
}

render(<SecurityForm/>, document.getElementById("app"))
```

Notice that we used a `ref` on the input. Refs take callback functions, and those callback functions have references to the current DOM element (or React component, depending on where the `ref` is placed). In this case, we're setting a property of `input` on `this` and assigning it to the input where the user is typing. This way, when the form is submitted, we can call `this.addFocus` if the pin code is incorrect and automatically focus the input again.
 
### refs as strings

If you're reading tutorials, you may sometimes see a syntax like `ref='foo'`, where the `ref` is being assigned to a string rather than a callback. But this should not be used: the React [documentation](https://facebook.github.io/react/docs/refs-and-the-dom.html#legacy-api-string-refs) specifically discourages this syntax in current projects.

### getDOMNode()

Similarly, some tutorials you may see a method called `getDOMNode`, this is deprecated and should **not** be used. You can learn more about the changes [here](http://stackoverflow.com/questions/30190608/react-js-the-difference-between-finddomnode-and-getdomnode). If you MUST get access to the dom node, using the ref callback is the preferred way of doing so.

### When not to use refs

Your first inclination may be to use refs to "make things happen" in your app, especially if you want to easily target a particular node in the virtual DOM and modify it. If this is the case, take a moment and think more critically about where state should be owned in the component hierarchy. Often, it becomes clear that the proper place to "own" that state is at a higher level in the hierarchy.

[http://stackoverflow.com/questions/29503213/use-state-or-refs-in-react-js-form-components](http://stackoverflow.com/questions/29503213/use-state-or-refs-in-react-js-form-components)

### Additional Resources

[http://reactkungfu.com/2015/09/common-react-dot-js-mistakes-unneeded-state/](http://reactkungfu.com/2015/09/common-react-dot-js-mistakes-unneeded-state/)

### Exercise

#### [⇐ Previous](./06-events.md) | [Table of Contents](./../readme.md) | [Next ⇒](./08-lifecycle.md)
