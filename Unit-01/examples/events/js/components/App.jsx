import React, {Component} from "react";
import InstructorList from './InstructorList.jsx'

export default class App extends Component {
    render(){
        return(
                <div>
                    <h1>Here are all the instructors!</h1>
                    <InstructorList/>
                </div>
            )
    }
}
