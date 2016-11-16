import React, {Component} from "react";

export default class Instructor extends Component {
    constructor(props, name){
        super(props)
        this.name = name
    }
    render(){
        return(
                <div>
                    <h2>This instructor's name is {this.props.name} <button onClick={this.props.removeInstructor}>X</button></h2>
                </div>
            )
    }
}

// A slightly less intelligent component...

// function Instructor(props){
//         return(
//                 <div>
//                     <h2>This instructor's name is {props.name} <button onClick={props.removeInstructor}>X</button></h2>
//                 </div>
//             )
//     }

// export default Instructor