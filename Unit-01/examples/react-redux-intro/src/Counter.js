import React from 'react'
import {connect} from 'react-redux'
import {increment, decrement} from './actions'


function Counter({count, decrement, increment}){
    return (
        <div>
            <p>The count is {count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    )
}


function mapStateToProps(state){
    return {
        count: state
    }
}

export default connect(mapStateToProps, {increment, decrement})(Counter)