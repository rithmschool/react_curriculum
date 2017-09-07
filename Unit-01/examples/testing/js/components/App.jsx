import React, {Component} from 'react'

export default class App extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            search: ''
        }
    }
    handleChange(e){
        this.setState({
            search: e.target.value
        })
    }
    render(){
        return(
            <div>
                <h1>Hello World!</h1>
                <input onChange={this.handleChange} type="text"/>
                <p>
                    The term is: {this.state.search}
                </p>
            </div>
            )
    }
}