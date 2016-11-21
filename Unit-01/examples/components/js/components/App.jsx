import React, {Component} from 'react'

export default class App extends Component {
    constructor(props, names){
        super(props)
        this.names = names
    }
    render(){
        const list = JSON.parse(this.props.names).map((v,i) => <li key={i}>{v}</li>)
        return(

                <div>
                    <ul>Names:
                        {list}
                    </ul>
                </div>
            )
    }
}