import React from 'react'
import {render} from 'react-dom'
import {Router, IndexRoute, Route, hashHistory, browserHistory} from 'react-router'
import Users from './components/Users.jsx'
import User from './components/User.jsx'
import Puppies from './components/Puppies.jsx'
import Puppy from './components/Puppies.jsx'


const App = ({children}) => (
     <div id="main-layout">{children}</div>
  )

render((
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path='/users' component={Users}/>
        <Route path='/users/:id' component={User}/>
        <Route path='/users/:id/puppies' component={Puppies}/>
        <Route path='/users/:id/puppies/:id' component={Puppy}/>
        </Route>
    </Router>

    ), document.getElementById('root'))