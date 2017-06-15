import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateTodo} from './actions';

class TodoEditContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.todo.text
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    const { todo } = this.props;

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
      </div>
    );
  }
}


const mapDispatchToProps = {updateTodo};

function mapStateToProps(state, props) {
  const { match } = props;
  if (match.params.id) {
    return {
      todo: state.todos.find(todo => todo.id === +match.params.id)
    }
  }
  return { todo: null };
}

export default connect(mapStateToProps)(TodoEditContainer);
