#### [⇐ Previous](./06-refs_forms.md) | [Table of Contents](./../readme.md) | [Next ⇒](./08-unit_1_assessment.md)

# Component Lifecycle

### Objectives

By the end of this chapter, you should be able to:

- Define life cycle methods related to initialization, changing state and props, and unmounting components
- Use life cycle methods to refactor code and better optimize applications

### Initialization

When a component get's rendered for the first time, we can tap into quite a few lifecycle hooks

#### GetDefaultProps

```js
```

#### GetInitialState

```js
```

#### ComponentWillMount

```js
```

#### Render

```js
```

#### ComponentDidMount

```js
```

### Changing State

Right when we call `setState`, we can tap into quite a few lifecycle hooks

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

### Changing Props

Right when props are being set on a component, we can tap into the same exact hooks as when we change state, except we get one more before `shouldComponentUpdate` called `componentWillRecieveProps`

#### ComponentWillRecieveProps

```js
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

```js
```

This is useful for clearing event listeners, timers and other data that you will not need in memory when the component is removed.

### Exercise

#### [⇐ Previous](./06-refs_forms.md) | [Table of Contents](./../readme.md) | [Next ⇒](./08-unit_1_assessment.md)