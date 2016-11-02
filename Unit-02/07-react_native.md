#### [⇐ Previous](./06-backend.md) | [Table of Contents](./../readme.md) | [Next ⇒](./07-unit_2_assessment.md)

# React Native

### Objectives

By the end of this chapter, you should be able to:

- Explain what `react-native` is and how it differs from other tools like `ionic`
- Build simple mobile applications using `react-native`
- Deploy `react-native` applications to respective app stores. 

### Getting Started

React Native is simply a bridge to run javascript natively on a mobile device.

Let's get started

```sh
npm install -g react-native
react-native init TodoApp
```

This will take a second to install all dependencies. It will create a folder for us with files for an ios and android app. These files are entry points for applications for specific devices. 

Let's see what this generates by running `react-native run-ios`

You will see a new terminal window open up as well! This is where can debug our react application

Let's start by creating a folder called `src` which will contain our code

### Foundational Components

```js
<View> // <div>
<Text> // <h1-6>
<TextInput> // <input />
<TouchableHighlight> // <button>
```

### Building a small todo app

### React native dev tools

Command d for the developer tools. 

Live reload loads the whole application, hot reloading keeps your state but loads any new changes. You can remotely debug your javascript and a new window in the browser will open at [http://localhost:8081/debugger-ui](http://localhost:8081/debugger-ui)

On ios there is not a great way to log information outside of Xcode and debugging remotely. You can also console.warn information and it will appear in the simulator.

### Styling + Flexbox

```js
import StyleSheet from 'react-native'

StyleSheet.create({
	main:{
		color: 'red',
		backgroundColor: 'green'
	}
})
```

Since each of our elements are `display:flex` already, we can add flexbox properties right on them:

```js
StyleSheet.create({
	main:{
		color: 'red',
		backgroundColor: 'green'
		alignItems: 'center',
		justifyContent: 'center
	}
})
```

### AJAX Requests

React Native uses the Fetch API for making external requests. Here is how we can use fetch to grab data from a server in the `componentWillMount` lifecycle method and place the data into state

```js
componentWillMount(){
	fetch('https://www.omdbapi.com?t=titanic', {'Accept': 'application/json'})
	.then(response => response.json())
	.then(data => console.log(data))
}
```

### Routing with React Native

Unfortunately, routing with React Native is not something that is completely standardized by the community. There are quite a few solutions for using routing.

### Importing Native Libraries with rnpm

Instead of manually adding native libraries to certain files, we can use a react native package manager called `rnpm``npm install -g rnpm`. We can install native libraries and link them as an alternative to using `cocoapods` (package manager for ios) and `gradle` (building for android)

We now can use these native libraries just like javascript packages!

### Publishing to the app store

Siphon / Codepush / AppHub

#### [⇐ Previous](./06-backend.md) | [Table of Contents](./../readme.md) | [Next ⇒](./07-unit_2_assessment.md)