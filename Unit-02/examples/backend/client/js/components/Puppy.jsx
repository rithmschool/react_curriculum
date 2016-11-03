import React from 'react';

export default class Puppy extends React.Component {
    constructor(props){
        super(props)
    }

    componentWillMount() {
        // fetch('http://')
    }
    render(){
        return (
            <div>
              <h1>HELLO WORLD!</h1>
            </div>
          )
        }
}