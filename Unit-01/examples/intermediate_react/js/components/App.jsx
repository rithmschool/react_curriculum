import React, {Component} from 'react'

export default class App extends Component {

    static get propTypes() {
        return{
           name: React.PropTypes.string,
           age: React.PropTypes.number,
           data: React.PropTypes.object.isRequired
        }
     }

    constructor(props, name, age, data){
        super(props)
        this.name = name
        this.age = age
        this.data = data
    }
    render(){
        return(
                <div>
                    <h1>Hello {this.props.name} you are {this.props.age} years old</h1>
                </div>
            )
    }
}

App.defaultProps = {
    age: 2
}