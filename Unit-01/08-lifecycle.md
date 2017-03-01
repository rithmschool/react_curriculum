#### [⇐ Previous](./07-refs_forms.md) | [Table of Contents](./../readme.md) | [Next ⇒](./09-unit_1_assessment.md)

# component Lifecycle

### Objectives

By the end of this chapter, you should be able to:

- Define life cycle methods related to initialization, changing state and props, and unmounting components
- Use life cycle methods to refactor code and better optimize applications

### Initialization

When a component get's rendered for the first time, we can tap into quite a few lifecycle hooks. 

#### `getDefaultProps` and `getInitialState`

If you're using the `React.createClass` syntax instead of `ES2015` class syntax, these two functions are the first two that get called in the component lifecycle (in this order).

First, if you want to give a component default props, `getDefaultProps` can be used to define any default props which can be accessed via this.props.  The invo­ca­tion of get­De­fault­Props actu­ally takes place once before any instance of the com­po­nent is cre­ated and the return value is shared among all instances of the com­po­nent. 

```js
getDefaultProps(){
    return { /* something here */};
}
```

The `getInitialState` method enables to set the initial state value, that is accessible inside the component via this.state. In the `React.createClass()` syntax, we have a special method called `getInitialState`. Using the `es2015 class syntax`, we place our initial state in the `constructor` function in our `class`.

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

For more on these functions (and their analogues using `ES2015` syntax, take a look at the [docs](https://facebook.github.io/react/docs/react-without-es6.html#declaring-prop-types-and-default-props).

#### `constructor`

Before the component is mounted, the constructor function is run. Using `ES2015` syntax, this is typically where initial state is set, and where any method binding occurs.

#### `componentWillMount`

`componentWillMount` is called before the render method is executed. It is important to note that setting the state in this phase will **not** trigger a re-rendering.

```js
componentWillMount(){
    // nothing has rendered yet
}
```

[Here](https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/birth/premounting_with_componentwillmount.html) are some examples of use-cases for this lifecycle method.

#### Render

The render method returns the needed component markup, which can be a single child component or null or false (in case you don't want any rendering).

#### componentDidMount

After the component renders, `componentDidMount` will fire. Since the component has rendered, we can access the DOM from this method.

```js
componentDidMount(){
    // the component mounted! Let's do some DOM stuff
}
```

### Changing State

Whenever we call `setState`, we can tap into quite a few lifecycle hooks:

#### `shouldComponentUpdate`

By default, when a parent component updates, all children are re-rendered as well. But `shouldComponentUpdate` allows us to pass on a re-rendering if we know one is not needed. This function should return a boolean; if it's `true`, the component will render, and if it's `false`, the component won't.

```js
shouldComponentUpdate(nextProps, nextState) {
    // return a boolean value
    return true;
}
```

#### `componentWillUpdate`

`componentWillUpdate` gets called as soon as the the shouldComponentUpdate returns true. This is sort of analogous to the `componentWillMount` hook; the difference now is that we're updating an existing component, not mounting a new one.

```js
componentWillUpdate(nextProps, nextState){
    // perform any preparations for an upcoming update
}
```

#### `render`

We've seen this one before! Just **always** remember - changing state triggers a re-render unless you modify `shouldComponentUpdate`

#### `componentDidUpdate`

Finally `componentDidUpdate` is called after the render method, and is similar to the `componentDidMount`.

```js
componentDidUpdate: function(prevProps, prevState){
    // component just updated!
}
```

### Changing Props

Right when props are being set on a component, we can tap into the same exact hooks as when we change state, except we get one more before `shouldComponentUpdate` called `componentWillRecieveProps`.

#### `componentWillRecieveProps`

This lifecycle method is only called when the props have changed and when this is not an initial rendering. `componentWillReceiveProps` allows us to update the state depending on the existing and upcoming props before the `render` method has been called.

```js
componentWillReceiveProps(nextProps) {
  this.setState({
    // set something 
  });
}
```

#### Next cycles:

After `componentWillReceiveProps`, the following events occur (similar to before):

- `shouldComponentUpdate`
- `componentWillUpdate`
- `render`
- `componentDidUpdate`

### Removing a component (unmounting)

#### `componentWillUnmount`

The only method we haven't touched yet is the `componentWillUnmount` which gets called before the component is removed from the DOM. This method can be beneficial when needing to perform cleanup operations, i.e. removing any timers defined in `componentDidMount`.

```js
componentWillUnmount(){
    // remove an event listener
    // clear a timeout
    // remove any reference to variables you will not be using to ensure there are no memory leaks
}
```

### Exercise

### Additional Resources

[https://facebook.github.io/react/docs/react-component.html](https://facebook.github.io/react/docs/react-component.html)

#### [⇐ Previous](./07-refs_forms.md) | [Table of Contents](./../readme.md) | [Next ⇒](./09-unit_1_assessment.md)