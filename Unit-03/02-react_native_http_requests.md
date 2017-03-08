# React Native: More Components and HTTP Requests

### Objectives

By the end of this chapter, you should be able to:

- Use the `TextInput` component to get user input
- Create your own custom buttons with `TouchableOpacity`
- Use `fetch` to get data from an api
- Use the ScrollView or ListView to display a list of things


### User Input

To allow the user to type something in, we need to use the `TextInput` component.  The facebook docs for `TextInput` are [here](https://facebook.github.io/react-native/docs/textinput.html).

Here is a simple example:

```js
import { AppRegistry, TextInput, Text, View } from 'react-native';

class TextInputExample extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Hello World' };
  }

  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'space-around'}}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Text>text: {this.state.text}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => TextInputExample);
```

Notice that the prop for changing the value of an input is `onChangeText`.  Also, always remember to give your `TextInput` a height or it will not display on iOS.

### React Native Buttons

React native provides a `Button` component, however the button component does not allow any customization.  You can see the docs for the button on [facebook here](https://facebook.github.io/react-native/docs/button.html).  The button is designed not to be customizable because it is supposed to look like the native button on iOS or on Android.  The button component takes care of the platform specific styling.

Sometimes you want a custom experience for you buttons though.  To create your own custom button, use `TouchableOpacity`.  Below is a custom button component that uses `TouchableOpacity` to wrap a Text component.  You can also use icons, images, etc inside of `TouchableOpacity`.

```js
import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default class CustomButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 4,
    backgroundColor: "blue",
    padding:10 
  },
  buttonText: {
    color: 'white',
    fontSize: 25
  } 
});
```

__EXERCISE 1__

Implement the following UI.  You will need to create your own buttons for the bottom two buttons:

![](https://raw.githubusercontent.com/tigarcia/SongGuessingGame/master/react-native-styling-mock.png)

### HTTP with Fetch

React native supports the javascript fetch api for making HTTP requests.  Fetch works exactly the same way as it does in the browser.  Additionally, just like react, if you are going to get some data from an HTTP request, the most likely place to put the request is in `componentDidMount`.


Here is an example of using the fetch api to get omdb data:

```

// assume there is some state for our movie data
componentDidMount() {
	const searchString = this.state.search;
	fetch(`https://www.omdbapi.com/?s=${serachString}`)
		.then(d => d.json)
		.then(d => {
			let movies = d.Search;
			this.setState({movies});
		});
}
```

### ScrollView

To display a list of data, you could use a scroll view.  Scroll Views are simple to use.  You can put the data you want inside of the `ScrollView` component, just like a view:


```
<ScrollView>
	<Text>Item 1</Text>
	<Text>Item 2</Text>
	<Text>Item 3</Text>
</ScrollView>
```

To see all the properties that you can set on a scroll view, checkout the [facebook docs](https://facebook.github.io/react-native/docs/scrollview.html)


#### ScrollView Performance

The simplicity of the `ScrollView` has a downside.  The `ScrollView` puts creates all of the react components that are in the scroll view even if those items are not displayed on screen.  That's fine for a small list, but if you have hundreds of complex list items, your scrolling could be noticeably slow.  The solution to this problem is to set up a [ListView](https://facebook.github.io/react-native/docs/listview.html).


### Assignment

Create a movie search app.  For details, go [here]()


### Exercise Solutions

__EXERCISE 1__

```js
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

export default class Welcome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Hello React-Native</Text>
        <Button title="SIMPLE BUTTON" onPress={() => null} color="blue"/>
        <View style={styles.inputContainer}>
          <TouchableOpacity
              style={styles.customButton}
              color="blue">
            <Text style={styles.buttonText}>PRESS ME</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.customButton}
              color="blue">
            <Text 
              style={[
                styles.buttonText,
                {fontSize: 25}
              ]}>NO! PRESS ME</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputContainer: {
    width: 350,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: 30
  },

  customButton: {
    borderRadius: 4,
    backgroundColor: "blue",
    padding:10 
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  } 
});
```