import React, { Component } from 'react';
import ParamsExample from './Params'
import RouterExample from './HashVsBrowser'
import AuthExample from './Prevent'
import ContextExample from './Context'

class App extends Component {
  render() {
    return (
        <div>
          <ContextExample/>
        </div>
    );
  }
}

export default App;
