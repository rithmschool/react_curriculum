import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Instructor = ({ match, location }) => (
  <div>
    <h3>What's in match? <pre>{JSON.stringify(match, null, 4)}</pre></h3>
    <h3>What's in location? <pre>{JSON.stringify(location, null, 4)}</pre></h3>
  </div>
)


const ParamsExample = () => (
  <Router>
    <div>
      <h2>Accounts</h2>
      <ul>
        <li><Link to="/elie">Elie</Link></li>
        <li><Link to="/matt">Matt</Link></li>
        <li><Link to="/tim">Tim</Link></li>
      </ul>
      <Route path="/:name" component={Instructor}/>
    </div>
  </Router>
)


export default ParamsExample