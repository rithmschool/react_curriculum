import React, { Component } from 'react';
import { Route,  Switch} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Welcome from './Welcome'
import NavigationBar from './NavigationBar'
import requireAuth from './requireAuth'

export default class App extends Component {
  render(){
    return(
      <div>
        <NavigationBar/>
        Hello World
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/welcome' component={requireAuth(Welcome)} />
          <Route render={() => <h3>No Match</h3>} />
        </Switch>
      </div>
    );
  }
}
