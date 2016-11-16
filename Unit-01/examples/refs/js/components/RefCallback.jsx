import React from 'react'

export default class RefCallback extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.displayInput = this.displayInput.bind(this);
  }

  focus() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }
  displayInput() {
    // grab the input using the correct keyword ``
    console.log(this.textInput.value);
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in this.textInput.
    return (
      <div>
        <input
          type="text"
          ref={(input) => this.textInput = input} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focus}
          onMouseOver={this.displayInput}
        />
      </div>
    );
  }
}