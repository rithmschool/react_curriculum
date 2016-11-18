import React from 'react';
import {Link, hashHistory} from 'react-router'
import $ from 'jquery'

export default class User extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          user: {}
        }
    }

    componentWillMount() {
        $.ajax({
            url:`http://localhost:3001/api/users/${this.props.params.id}`,
            method: "GET",
            dataType: 'json',
            headers: {
                token: "Authorizaiton: Bearer " + localStorage.getItem("token")
            }
        }).then((user) =>{
            this.setState({user})
        }).catch((err) =>{
            hashHistory.push('/users');
        })
    }

    render(){
        return (
            <div>
              <pre>{JSON.stringify(this.state.user,null,2)}</pre>
            </div>
          )
        }
}