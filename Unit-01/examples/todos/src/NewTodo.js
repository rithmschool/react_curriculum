import React, { Component } from 'react';
import './NewTodo.css'

class NewTodo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({newTodo: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.addTodo(this.state.newTodo)
    this.setState({newTodo: ''})
  }

  render() {
    return (
      <form className="NewTodo" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.newTodo}
          onChange={this.handleChange}
        />
        <button type="submit">So much to do!</button>
      </form>
    )
  }
}

export default NewTodo;