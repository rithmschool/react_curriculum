import React, {Component} from "react";
import Instructor from './Instructor.jsx'

export default class InstructorList extends Component {
    constructor(props){
        super(props)
        this.state = {
            instructors: ["Elie", "Matt", "Tim"]
        }
    }
    handleRemove(idx){
        debugger
        let {instructors} = this.state
        let newInstructors = instructors.slice(0, idx).concat(instructors.slice(idx+1))
        this.setState({
            instructors: newInstructors
        })
    }
    render(){
        let instructors = this.state.instructors.map((name,idx) => {
            return(
                <div key={idx}>
                    <Instructor removeInstructor={this.handleRemove.bind(this,idx)} name={name}></Instructor>
                </div>
            )
        })
        return(
                <div>
                    {instructors}
                </div>
            )
    }
}