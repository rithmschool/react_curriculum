#### [⇐ Previous](./07-refs_forms.md) | [Table of Contents](./../readme.md) | [Next ⇒](./09-unit_1_assessment.md)

# Component Lifecycle

### Objectives

By the end of this chapter, you should be able to:

- Define life cycle methods related to initialization, changing state and props, and unmounting components
- Use life cycle methods to refactor code and better optimize applications

### Initialization

When a component get's rendered for the first time, we can tap into quite a few lifecycle hooks

#### GetDefaultProps

First, a component is given default props, getDefaultProps can be used to define any default props which can be accessed via this.props.  The invo­ca­tion of get­De­fault­Props actu­ally takes place once before any instance of the com­po­nent is cre­ated and the return value is shared among all instances of the com­po­nent. 

```js
getDefaultProps(){
    return { /* something here */};
}
```

#### GetInitialState

The getInitialState method enables to set the initial state value, that is accessible inside the component via this.state. In the `React.createClass()` syntax, we have a special method called `getInitialState`. Using the `es2015 class syntax`, we place our initial state in the `constructor` function in our `class`.

```js
class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            // equivalent to getInitialState
        }
    }
}
```

#### ComponentWillMount

`componentWillMount` is called before the render method is executed. It is important to note that setting the state in this phase will not trigger a re-rendering.

```js
```

#### Render

The render method returns the needed component markup, which can be a single child component or null or false (in case you don't want any rendering).

```js
```

#### ComponentDidMount

As soon as the render method has been executed the componentDidMount function is called. The DOM can be accessed in this method, enabling to define DOM manipulations or data fetching operations. Any DOM interactions should always happen in this phase not inside the render method.

```js
```

### Changing State

Right when we call `setState`, we can tap into quite a few lifecycle hooks

#### ShouldComponentUpdate

shouldComponentUpdate is always called before the render method and enables to define if a re-rendering is needed or can be skipped. Obviously this method is never called on initial rendering. A boolean value must be returned.

```js
shouldComponentUpdate(nextProps, nextState) {
    // return a boolean value
    return true;
}
```

#### ComponentWillUpdate

componentWillUpdate gets called as soon as the the shouldComponentUpdate returned true. Any state changes via this.setState are not allowed as this method should be strictly used to prepare for an upcoming update not trigger an update itself.

```js
componentWillUpdate(nextProps, nextState){
    // perform any preparations for an upcoming update
}
```

#### Render

```js
```

#### ComponentDidUpdate

Finally componentDidUpdate is called after the render method. Similar to the componentDidMount, this method can be used to perform DOM operations after the data has been updated.

```js
componentDidUpdate: function(prevProps, prevState){
    // 
}
```

### Changing Props

Right when props are being set on a component, we can tap into the same exact hooks as when we change state, except we get one more before `shouldComponentUpdate` called `componentWillRecieveProps`

#### ComponentWillRecieveProps

componentWillReceiveProps is only called when the props have changed and when this is not an initial rendering. componentWillReceiveProps enables to update the state depending on the existing and upcoming props, without triggering another rendering. One interesting thing to remember here is that there is no equivalent method for the state as state changes should never trigger any props changes.

```js
componentWillReceiveProps(nextProps) {
  this.setState({
    // set something 
  });
}
```

#### ShouldComponentUpdate

```js
```

#### ComponentWillUpdate

```js
```

#### Render

```js
```

#### ComponentDidUpdate

```js
```

### Removing a component (unmounting)

#### ComponentWillUnmount

The only method we haven't touched yet is the componentWillUnmount which gets called before the component is removed from the DOM. This method can be beneficial when needing to perform clean up operations, f.e. removing any timers defined in componentDidMount.

```js
```

This is useful for clearing event listeners, timers and other data that you will not need in memory when the component is removed.

### Exercise

### Additional Resources

[https://facebook.github.io/react/docs/react-component.html](https://facebook.github.io/react/docs/react-component.html)

#### [⇐ Previous](./07-refs_forms.md) | [Table of Contents](./../readme.md) | [Next ⇒](./09-unit_1_assessment.md)