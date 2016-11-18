import React from 'react'
import {render} from 'react-dom'
import {Router, IndexRoute, Route, hashHistory, browserHistory} from 'react-router'
import Users from './components/Users.jsx'
import User from './components/User.jsx'
import NewUserForm from './components/NewUserForm.jsx'
import LoginUserForm from './components/LoginUserForm.jsx'
import Puppies from './components/Puppies.jsx'
import Puppy from './components/Puppies.jsx'

const Parent = (props) => {
  return(
      <div>
        <h1>Welcome!</h1>
        {props.children}
      </div>
    )
}

function requireAuth(nextState, replace) {
  if (!localStorage.getItem('token')) {
    replace({
      pathname: '/users/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function logout(nextState, replace) {
  localStorage.removeItem('token')
  hashHistory.push('/users/login')
}



class App extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
        <Router history={hashHistory}>
          <Route path="/" component = {Parent}>
            <Route path='/users' component={Users} onEnter={requireAuth}/>
            <Route path='/users/logout' onEnter={logout}/>
            <Route path='/users/new' component={NewUserForm}/>
            <Route path='/users/login' component={LoginUserForm}/>
            <Route path='/users/:id' component={User} onEnter={requireAuth}/>
            <Route path='/users/:id/puppies' component={Puppies} onEnter={requireAuth}/>
            <Route path='/users/:id/puppies/:id' component={Puppy} onEnter={requireAuth}/>
            </Route>
        </Router>
      </div>
      )
  }
}

render(<App/>, document.getElementById('root'))