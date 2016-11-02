import React from 'react'

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.printInfo = this.printInfo.bind(this)
        this.state = {
            name: ''
        }
    }
    printInfo(e){
        e.preventDefault()
        const name = `${this.refs.first.value} ${this.refs.last.value}`
        this.setState({name})
        e.target.reset()
    }
    render(){
        return (
            <div>
                <h1>Your name is {this.state.name}</h1>
                <form onSubmit={this.printInfo}>
                    <input type="text" name="firstName" ref="first"/>
                    <input type="text" name="lastName" ref="last"/>
                    <input type="submit" value="Add me!"/>
                </form>
            </div>

            )
    }
}