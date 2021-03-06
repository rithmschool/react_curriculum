#### [⇐ Previous](./06-redux_and_react.md) | [Table of Contents](./../readme.md) | [Next ⇒](./08-backend.md)

# Testing Redux

## Objectives

By the end of this chapter, you should be able to:

- Test actions and reducers properly with Jest
- Use Jest and Enzyme to test components with redux state

## Overview

One of the main benefits of Redux (and functional programming in general) is that it is very easy to test. Because we have pure functions, our outputs should be very predictable given the test inputs, and this lets us write excellent unit tests against action creators and reducers.

## Testing Action Creators

Here is an example action creator:

`actions.js`

```js

export function addTodo(todo) {
  return {
    type: ADD_TODO,
    payload: todo
  }
}

```

Here is an example unit test via Jest:

`actionCreatorTest.js`

```js

import { ADD_TODO, addTodo } from '../actions';

describe('addTodo', () => {
  it('fires off an add todo action', () => {

    const expected = {
      type: ADD_TODO,
      payload: 'foo'
    };

    expect(addTodo('foo')).toEqual(expected);
  });
});

```

So it is super straightforward. We're just testing that the function call with a dummy payload returns a properly-formatted action that we can safely pass to our reducer.

## Testing Reducers

Likewise, reducers are going to be straightforward unit tests as well. Similar to action creators, we just want to test that the reducer is able to return the appropriately-modified state each time.

Here is our reducer:

`reducers.js`

```js
import { ADD_TODO } from '../actions';

export function todoReducer(state = [], action) {
  if (action.type === ADD_TODO) {
    // return a new array with old state and new payload
    const newState = [...state, action.payload];
    return newState;
  } else {
    // by default return original state
    return state;
  }
}
```

`reducerTest.js`

```js

import { ADD_TODO } from '../actions';
import { todoReducer } from '../reducers';

describe('todoReducer', () => {
  it('adds a todo item', () => {

    const addAction = {
      type: ADD_TODO,
      payload: 'foo'
    };
    const expected = ['foo'];

    // our reducer should add 'foo' to the empty state
    expect(todoReducer([], addAction)).toEqual(expected);
  });

  it('returns default state', () => {
    // our reducer should return default state for an unrecognized action type
    expect(todoReducer([], { type: 'DUMMY_TYPE' })).toEqual([]);
  });
});

```

In the above tests, we are calling the reducer directly and asserting that the new state returned is what we would expect.

## Testing React components with Redux state using Enzyme

Now we can tie together React and Redux.

Here is our container which maps state and dispatch to props:

`TodoFormContainer.js`

```js
import { ADD_TODO } from'./actions';
import { TodoForm } from'.';
import { connect } from'react-redux';

export const mapStateToProps = (state = { todos: [] }) => {
  return {
    todos: state.todos
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    addTodo: item => {
      // call the reducer!
      dispatch({
        type: ADD_TODO,
        value: item
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);

```

Now we can test it just like other React components, using Enzyme:

```js

import { ADD_TODO } from'./actions';
import { TodoFormContainer, mapStateToProps, mapDispatchToProps } from'.';
import { shallow } from'enzyme';

describe('<TodoFormContainer />', () => {
  const wrapper = (props = {}) => shallow(<TodoFormContainer {...props} />);

  it('renders the container', () => {
    expect(wrapper.find(TodoFormContainer)).toHaveLength(1);
  });

  it('passes todos from state to props', () => {
    const state = {
      todos: ['foo','bar']
    };
    expect(mapStateToProps(state)).toEqual({ todos: ['foo','bar'] });
  });

  it('dispatches addItem', () => {
    // mock a dispatch function with jest
    const dispatch = jest.fn();
    
    // call the function with the mock function as a param
    mapDispatchToProps(dispatch).addTodo('foo');

    // expect a proper action to have been fired
    expect(dispatch).toHaveBeenCalledWith({
      type: ADD_TODO,
      payload:'foo'
    });
  });
});

```

## Additional Resources

[Writing Tests in Redux](http://redux.js.org/docs/recipes/WritingTests.html)

[A thorough screencast for testing React and Redux](https://www.youtube.com/watch?v=bMmntkVM4wQ)

## Exercises

#### [⇐ Previous](./06-redux_and_react.md) | [Table of Contents](./../readme.md) | [Next ⇒](./08-backend.md)