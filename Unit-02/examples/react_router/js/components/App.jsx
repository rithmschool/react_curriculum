import React, {Component} from 'react'
import {Router, Route, hashHistory, IndexRoute, Link} from 'react-router'

const Main = () => {
    return(
        <div>Hello from main!
            <Link to='/first'>First</Link> |
            <Link to='/second'>Second</Link>
        </div>
        )
    }
const First = () => <div>Hello from first!</div>
const Second = () => <div>Hello from second!</div>

const Users = (props) => {
    return(
            <div>
                <Link activeStyle={{ color: 'red' }} to='/first'>First</Link> |
                <Link activeStyle={{ color: 'red' }} to='/second'>Second</Link>
                <Link activeStyle={{ color: 'red' }} to='/users/Elie'>Elie</Link>
                <Link activeClassName="active" to='/users/Matt'>Matt</Link>
                <Link activeClassName="active" to='/users/Tim'>Tim</Link>
                <h1>Hello Users!</h1>
                {props.children}
            </div>
        )
}

const User = (props) => {
    return(
            <div>
                <h1>Your name is {props.params.name}!</h1>
            </div>
        )
}

export default class App extends Component {
    render(){
        return(
                <div>
                    <Router history={hashHistory}>
                        <Route path='/users' component={Users}>
                            <Route path='/main' component={Main}></Route>
                            <Route path='/first' component={First}></Route>
                            <Route path='/second' component={Second}></Route>
                            <Route path='/users/:name' component={User}></Route>
                        </Route>
                    </Router>
                </div>
            )
    }
}