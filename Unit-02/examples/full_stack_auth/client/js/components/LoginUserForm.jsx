import React, {Component} from 'react';
import { hashHistory } from 'react-router'
import $ from 'jquery'

export default class NewUserForm extends Component {
    constructor(props){
        super(props)
        this.state = {
          username: '',
          password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit(event){
      const {username,password} = this.state
      event.preventDefault()
      $.ajax({
        url:"http://localhost:3001/api/users/auth",
        dataType: 'json',
        method: "POST",
        data: {
          username,password
        }
      }).then(function(val){
        localStorage.setItem('token', val)
        hashHistory.push('/users');
      }).catch(function(error){
        console.log("Oops! Something went wrong")
      })

    }
    handleChange(e) {
      this.setState({[e.target.name]: e.target.value});
    }
    render(){
        return (
            <div>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <input type="submit" />
              </form>
            </div>
          )
        }
}