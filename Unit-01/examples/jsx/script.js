const App = React.createClass({
    // option 1 - isolate into a separate method
    determineUser(){
        if(this.props.name === "Elie"){
            return <h1>Nice!</h1>
        }
        return  <h1>Not elie :(</h1>
    },
    render(){
        // option 2 - declare a variable in render
        if(this.props.name === "Elie"){
            var info = "Hello Elie!"
        } else {
            var info = "Hello someone else..."
        }
        return(
                <div>
                    <h1>Hello {this.props.name}!</h1>
                    {/* option 3 - ternary inside return...JSX comment are pretty quirky as well */}
                    <p>
                        {this.props.name ? "Thanks for a name!" : "Thanks for nothing...."}
                    </p>
                    {this.determineUser()}
                    {info}
                </div>
            )
    }
})

ReactDOM.render(<App name="Elie"/>, document.getElementById('app'))