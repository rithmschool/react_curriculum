import React from 'react';
import Link from 'react-router'

export default class User extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          user: {}
        }
    }

    componentWillMount() {
        fetch(`http://localhost:3001/api/users/${this.props.params.id}`, {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
            }
         }).then((res) => {
            // Convert to JSON
            return res.json();
        }).then((user) => {
            this.setState({user})
        });
    }

    render(){
        return (
            <div>
              <pre>{JSON.stringify(this.state.user,null,2)}</pre>
            </div>
          )
        }
}