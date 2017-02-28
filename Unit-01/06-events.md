#### [⇐ Previous](./05-props_state.md) | [Table of Contents](./../readme.md) | [Next ⇒](./07-refs_forms.md)

# Events

### Objectives

By the end of this chapter, you should be able to:

- Compare and contrast events and synthetic events
- Build React applications with events

### Events with React

Events in React are not actually `DOM` events they are called `synthetic` events. They React event API is almost identical to the DOM API in its methods, but they are not exactly the same.

```js
import React, {Component} from 'react'
import {render} from 'react-dom'

class App extends Component {
    handleClick(){
        alert("click!");
    }
    render(){
        return (<div>
            <button onClick={this.handleClick}></button>
            <h2>These are the children!</h2>
        </div>);
    }
}

render(<App/>, document.getElementById("main"));
```

### Binding with `this`

```js
import React, {Component} from 'react'
import {render} from 'react-dom'

class App extends Component {

    handleName(){
        alert(this.props.name);
    }

    render(){
        return (<div>
            <button onClick={this.handleName.bind(this)}>{this.props.name}</button>
            <h2>These are the children!</h2>
        </div>);
    }
}

render(<App name="Matt"/>, document.getElementById("app"));
```

### Passing event handlers from parents to children

Very commonly, when we want to change data in a child component, we can not simply do that as the data is stored in props. In order to change this data, we need to re-render the component and pass down new state from a parent. Let's imagine that we have a list of Instructor components and we can delete individual instructors. You can run this example [here](./examples/events).

The idea is that we pass down an event listener to our child component, that runs a function in the parent component which can then change the state and re-render necessary child components. Here is what our parent component might look like:

```jsx
export default class InstructorList extends Component {
    constructor(props){
        super(props);
        this.state = {
            instructors: ["Elie", "Matt", "Tim"]
        };
    }
    handleRemove(idx){
        let {instructors} = this.state;
        let newInstructors = instructors.slice(0, idx).concat(instructors.slice(idx+1));
        this.setState({
            instructors: newInstructors
        });
    }
    render(){
        let instructors = this.state.instructors.map((name,idx) => {
            return(
                <div key={idx}>
                    <Instructor removeInstructor={this.handleRemove.bind(this,idx)} name={name}></Instructor>
                </div>
            );
        });
        return(
                <div>
                    {instructors}
                </div>
            );
    }
}

render(<InstructorList/>, document.getElementById("main"));
```

And our child component can look like this:

```jsx
import React, {Component} from "react";

export default class Instructor extends Component {
    constructor(props, name){
        super(props);
        this.name = name;
    }
    render(){
        return(
                <div>
                    <h2>This instructor's name is {this.props.name} <button onClick={this.props.removeInstructor}>X</button></h2>
                </div>
            );
    }
}
```

You can also use the event object in your components using the keyword `event` inside of your handlers.  

### Exercise

#### [⇐ Previous](./05-props_state.md) | [Table of Contents](./../readme.md) | [Next ⇒](./07-refs_forms.md)
