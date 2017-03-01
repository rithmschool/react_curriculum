import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store'
import MovieDetails from './MovieDetails'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          Let's see a random movie!
          <MovieDetails/>
        </div>
      </Provider>
    );
  }
}

export default App;
