import React from 'react';
import {Link} from 'react-router'

export default class Puppies extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            puppies: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:3001/api/users/${this.props.params.id}/puppies`, {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
            }
         }).then((res) => {
            // Convert to JSON
            return res.json();
        }).then((puppies) => {
            this.setState({puppies})
        });
    }

    render(){
        var puppies = this.state.puppies.map(puppy => {
            return (<p key={puppy.id}>
                {puppy.name} | <Link to={`users/${puppy.user.id}/puppies/${puppy.id}`}>{puppy.puppiename}</Link>
            </p>
            )
        })
        return (
            <div>
                <Link to={'/'}>Go Home</Link>
                <h1>All the puppies for this user!</h1>
                {puppies}
            </div>
          )
        }
}