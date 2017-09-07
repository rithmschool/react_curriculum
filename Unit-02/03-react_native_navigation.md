# React Native Navigation

### Objectives

By the end of this chapter, you should be able to:

* Describe the state of navigation in react native
* Use simple navigation components to navigate between scenes


### Navigation?

![](https://idotips.files.wordpress.com/2014/03/confused2.jpg)

Navigation has been a bit of a community pain point for react native.  Here is a survey of the options:

* __NavigatorIOS__ - part of react-native.  Only supports iOS and doesn't seem to be in future plans __<span style="color:red">NOT RECOMENDED</span>__
* __Navigator__ - Also part of react-native.  Implemented in JS.  Also seems out of favor. __<span style="color:red">NOT RECOMENDED</span>__
* __NavigationExperimental__ - Part of react-native. A popular choice if you are adding redux to your app.  Not recommended if you do not use redux.
* __react-native-navigation__ - A native implementation of navigation from wix.  If you want native components, this is a good bet.
* __ex-navigation__ - Exponent's navigation library.  Popular but not being actively supported.  Instead...
* __react-navigation__ - A new project supported by exponent and facebook. The plan is for react-navigation to replace NavigationExperimental.  Check it out at [https://reactnavigation.org/](https://reactnavigation.org/)

### react-navigation

Offers built in navigators:

* StackNavigator
* TabNavigator
* DrawerNavigator

Once your components are inside of a navigator, each component is given [this.props.navigation](https://reactnavigation.org/docs/navigators/navigation-prop)

From `this.props.navigation`, you get access to `this.props.navigation.navigate`, which allows you to programmatically switch between stacks or tabs.  Let's add a `StackNavigator` to our app.

Check out the [docs](https://reactnavigation.org/docs/intro/) for some examples.


#### Simple Example

```js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {StackNavigator} from 'react-navigation'


export default class Navigators extends Component {
  static navigationOptions = {
    title: "Navigators"
  }
  render() {
    const {navigate} = this.props.navigation; 
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js or index.ios.js
        </Text>
        <TouchableOpacity onPress={() => navigate("Next")}>
          <Text>NEXT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Next extends Component {
  static navigationOptions = {
    title: "Next"
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Next Page</Text>
      </View>
    );
  }
}

const MainStack = StackNavigator({
  Home: { screen: Navigators },
  Next: { screen: Next }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Navigators', () => MainStack);
```

Notice in the code that our top level component is now the `StackNavigator`.  That component decides which scenes to show.

__EXERCISE__

Make an app that is composed of multiple navigators.  You can adapt the example above so that the next screen is no longer a screen, but a tab navigator.