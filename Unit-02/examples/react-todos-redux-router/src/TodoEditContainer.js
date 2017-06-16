import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateTodo, deleteTodo} from './actions';

class TodoEditContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.todo.text,
      id: +this.props.match.params.id
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(e) {
    // debugger;
    this.setState({
      text: e.target.value,
      id: +this.props.match.params.id
    });
  }

  handleDelete(e) {
    this.props.deleteTodo(this.state.id);
  }

  render() {
    return (
      <div>
        <form className="form-inline" onSubmit={(e) => {
          e.preventDefault();
          // this.props.dispatch(addTodo(this.state))
          this.props.updateTodo(this.state);
          this.props.history.push('/todos');
        }}>
        <div className="form-group">
          <label htmlFor="todo-input">Edit todo:</label>
          <input style={{margin: "10px"}} onChange={this.handleChange}
                 value={this.state.text}
                 id="todo-input" placeholder="something's wrong"
                 className="form-control" />

          <button style={{margin: "10px"}}
                  type="submit" className="btn btn-primary">Update</button>
        </div>
        </form>
        <Link to={"/todos"}>
          <button style={{margin: "10px"}}
                  className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
        </Link>
      </div>
    );
  }
}


const mapDispatchToProps = {updateTodo, deleteTodo};

function mapStateToProps(state, props) {
  const { match } = props;
  if (match.params.id) {
    return {
      todo: state.todos.find(todo => todo.id === +match.params.id)
    }
  }
  return { todo: null };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoEditContainer);
