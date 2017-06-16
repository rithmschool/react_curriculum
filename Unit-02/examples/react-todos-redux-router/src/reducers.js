import { ADD_TODO, UPDATE_TODO, DELETE_TODO } from './actions';

const DEFAULT_STATE = {
  todos: [{id: 0, text: "Walk dog"}, {id: 1, text: "Make bed"}],
}
let nextId = 2;
export default function games(state = DEFAULT_STATE, action = {}) {
  switch(action.type) {

    case ADD_TODO: // IMPLEMENT ME
      const todo = {id: nextId++, ...action.todo}
      return {...state, todos: [...state.todos, todo]}
    case UPDATE_TODO:
      const todos = state.todos.map((t, i) => {
        return t.id === action.todo.id ? action.todo : t;
      });
      return {...state, todos}
    case DELETE_TODO:
      const remainingTodos = state.todos.filter((t, i) => {
        return i !== action.id
      })
      return {...state, todos: remainingTodos}
    default:
      return state;
  }
}
