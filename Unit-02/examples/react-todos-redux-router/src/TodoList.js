import React from 'react'
import Todo from './Todo'
import {connect} from 'react-redux';

const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
      />
      // <button name="edit" type="submit" onClick={this.props.history.push(`/todos/${todo.id}}/edit`)}>Edit</button>
    )}
  </ul>
);

const mapStateToProps = state => state;

export default connect(mapStateToProps)(TodoList);

