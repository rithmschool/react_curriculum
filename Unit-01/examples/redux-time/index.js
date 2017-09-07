import React, {Component} from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Counter from './components/Counter.jsx'
import rootReducer from './rootReducer'

// create a store?
    // need createStore from 'redux'
    // ....use it!

const myFirstStore = createStore(rootReducer)

class App extends Component {
    render(){
        return(
                <Provider store={myFirstStore}>
                    <Counter/>
                </Provider>
            )
    }
}


render(<App/>, document.getElementById('root'))