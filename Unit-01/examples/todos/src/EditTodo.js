import React, { Component } from 'react';
import "./EditTodo.css"

class EditTodo extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.state = {
      updatedTodo: this.props.todo
    }
  }

  handleChange(e) {
    this.setState({updatedTodo: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.handleEdit(this.state.updatedTodo)
    this.props.toggleEdit();
  }

  render() {
    return (
      <form className="EditTodo" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.updatedTodo}
          onChange={this.handleChange}
        />
        <button type="submit">Edit this todo!</button>
      </form>
    )
  }
}

export default EditTodo;