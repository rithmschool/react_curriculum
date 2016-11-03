import React from 'react';
import {Link} from 'react-router'

export default class User extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/users', {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
            }
         }).then((res) => {
            // Convert to JSON
            return res.json();
        }).then((users) => {
            this.setState({users})
        });
    }

    render(){
        var users = this.state.users.map(user => {
            return (<p key={user.id}>
                {user.username} | <Link to={`/users/${user.id}`}>{user.username}</Link>
            </p>
            )
        })
        return (
            <div>
                <h1>All the users!</h1>
                <pre>
                    {JSON.stringify(this.state.users,null,2)}
                    {users}
                </pre>
            </div>
          )
        }
}