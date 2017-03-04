import React, {Component} from 'react';
import {connect} from 'react-redux'
import {increment, decrement} from '../actions'

class Counter extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {count, increment, decrement} = this.props
        return (<div>
                    <h1>The count is {count}</h1>
                    <button onClick={() => increment()}>+</button>
                    <button onClick={() => decrement()}>-</button>
                </div>)
    }
}

function mapStateToProps(state){
    return {
        count: state.count
    }
}
// if we leave the second parameter to connect blank
// our component will get a prop called dispatch
export default connect(mapStateToProps, {increment, decrement})(Counter)











