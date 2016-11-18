import React from 'react';
import {Link, hashHistory} from 'react-router'
import $ from 'jquery'

export default class User extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            users: []
        }
    }

    componentWillMount() {
        $.ajax({
            url:'http://localhost:3001/api/users',
            method: "GET",
            dataType: 'json',
            headers: {
                token: "Authorizaiton: Bearer " + localStorage.getItem("token")
            }
        }).then((users) =>{
            this.setState({users})
        }).catch((err) =>{
            hashHistory.push('/users/login');
        })
    }

    render(){
        var users = this.state.users.map(user => {
            return (<p key={user.id}>
                {user.username} | <Link to={`/users/${user.id}`}>{user.username}</Link> | | <Link to={`users/${user.id}/puppies`}>See puppies</Link>
            </p>
            )
        })
        return (
            <div>
                <Link to={'/'}>Go Home</Link>
                <h1>All the users!</h1>
                {users}
            </div>
          )
        }
}