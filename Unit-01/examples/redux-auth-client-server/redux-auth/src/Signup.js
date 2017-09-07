import React from 'react';
import { connect } from 'react-redux';
import { signup } from './actions';
import PropTypes from 'prop-types';

class Signup extends React.Component {
  // pretty standard
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    // change a key in state with whatever the name attribute is
      // either username or password
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
      // make sure we use an arrow function here to correctly bind this to this.props.history
      this.props.signup(this.state).then(() => {
          // route to /login once signup is complete
          this.props.history.push('/welcome');
        },
        // if we get back a status code of >= 400 from the server...
        (err) =>{
          // not for production - but good for testing for now!
          debugger
        });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
            <form onSubmit={this.onSubmit}>
              <h1>Sign up!</h1>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={this.state.username} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">password</label>
                <input type="password" id="password" name="password" value={this.state.password} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-lg">
                  Sign up
                </button>
              </div>
            </form>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired
}

export default connect(null,{ signup })(Signup);
