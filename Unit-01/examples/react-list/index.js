import React, {Component} from 'React'
import {render} from 'react-dom'

const Student = (props) => (
    <div>
        <li>{props.children}</li>
    </div>
)

const NewStudentForm = (props) => (
    <form onSubmit={props.handleNewStudent}>
        <label htmlFor="name"></label>
        <input type="text" name="student_name" id="name"/>
        <input type="submit" value="Add a student"/>
    </form>
)

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            students: ["Tommy", "Divya", "Andrew", "Torre"]
        }
    }
    addStudent(e){
        e.preventDefault()
        this.setState({
            students: [...this.state.students ,e.target.name.value]
        })
        e.target.name.value = ''
    }
    render(){
        const students = this.state.students.map(function(student, idx){
            return <Student key={idx}>{student}</Student>
        })
        return(
                <div>
                    <h1>See our list of students</h1>
                    <ul>
                        {students}
                    </ul>
                    <h2>What about everyone else?</h2>
                    <NewStudentForm handleNewStudent={this.addStudent.bind(this)}/>
                </div>
            )
    }
}

render(<App/>, document.getElementById('app'))