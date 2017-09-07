// always need to import React
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export class Todo extends Component {
  constructor() {
    super();
    this.state = {
      todos: ["eat", "sleep", "go home"],
      newTodo: ''
    }
  }

  handleChange(text) {
    this.setState({newTodo: text});
  }

  handlePress() {
    const todos = [...this.state.todos, this.state.newTodo];
    this.setState({todos, newTodo: ''});
  }

  render() {
    return (
      <View>
        <TextInput
          style={{height:200}}
          value={this.state.newTodo}
          onChangeText={this.handleChange.bind(this)}
        />
        <TouchableOpacity onPress={this.handlePress.bind(this)}>
          <Text>make</Text>
        </TouchableOpacity>
        <View>
          {this.state.todos.map((todo, i) => (
            <Text key={i}>{todo}</Text>
          ))}
        </View>
      </View>
    )
  }
}