import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import MakeupDetails from './MakeupDetails'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          Let's see a random movie!
          <MakeupDetails/>
        </div>
      </Provider>
    );
  }
}

export default App;
