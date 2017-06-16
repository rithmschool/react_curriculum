import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateTodo, deleteTodo} from './actions';

class TodoEditContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.todo.text,
      id: this.props.todo.id
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    // this.props.todo is the correct todo object
    return (
      <div>
        <form className="form-inline" onSubmit={(e) => {
          e.preventDefault();
          // here, this.state = "Walk dog again" (modified text)
          this.props.updateTodo(this.state);
          this.props.history.push('/todos');
        }}>
          <div className="form-group">
          <label htmlFor="todo-input">Todo:</label>
          <input style={{margin: "10px"}} onChange={this.handleChange}
                 value={this.state.text}
                 id="todo-input" placeholder="something important"
                 className="form-control" />
          <button style={{margin: "10px"}}
                  type="submit" className="btn btn-primary">Update</button>
          </div>
        </form>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.deleteTodo(this.state.id);
          this.props.history.push('/todos');
        }}>
          <div className="form-group">
          <button style={{margin: "10px"}}
                  type="submit" className="btn btn-danger">Delete</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match } = props; // get props.match and save its value as match
  if(match.params.id) { // if there's an id in the URL parameters
    return {
      // find the todo from state that has the matching id
      todo: state.todos.find(todo => todo.id === +match.params.id)
    }
  }
  return { todo: null }
} 

const mapDispatchToProps = {updateTodo, deleteTodo};

export default connect(mapStateToProps, mapDispatchToProps)(TodoEditContainer);
