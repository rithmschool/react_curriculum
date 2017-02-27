#### [⇐ Previous](./01-intro.md) | [Table of Contents](./../readme.md) | [Next ⇒](./03-webpack.md)

# Babel + JSX

### Objectives

By the end of this chapter, you should be able to:

- Understand what `JSX` is and how it is used with React
- Define what a transpiler is and include `babel-core` in an application

### JSX Introduction

JSX allows you to write HTML in your JavaScript. This is quite a different approach to how many frameworks and libraries work. However, the benefits here are that we can write our HTML that we expect to see. Here is what some JSX looks like.

```js
var App = React.createClass({
    render: function(){
        return (
                <div>
                    <h1>Hello World!</h1>
                </div>
            )
    }
})
```

Instead of using `React.DOM` we can actually use JSX to write HTML inside of our JavaScript code! But how do we "convert" our JSX into JavaScript? We need a little bit of help from a [transpiler](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them). Enter `babel`.

Make sure that you have JSX syntax highlighting for Sublime or else you will get some pretty ugly looking code. You've got a few highlighting options, but Babel provides its own, called `babel-sublime`. In sublime, the package you should search for and install is simply called "Babel." Once it's installed, you can set the syntax of your JSX files to JavaScript (Babel) in order to get the proper highlighting. (More advanced configuration options can be found [here](https://github.com/babel/babel-sublime).)

### Babel

In order to convert our JSX to JavaScript (what we wrote before), we need to transpile our code. Our tool to transpile is going to be `babel`. To include babel, we can add the cdn `<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"></script>` and include a script with an attribute of `text/babel`. Here's what that might look like: 

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>React + Babel</title>
</head>
<body>
  <div id="app"></div>
  <script src="https://unpkg.com/react@15/dist/react.js"></script>
  <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"></script>
  <script type="text/babel" src="app.jsx"></script>
</body>
</html>
```

Let's see what some more JSX looks like. In your `app.jsx`, try writing the following:

```js
var App = React.createClass({
    render: function(){
        var style = {color: 'red'}
        return (
                <div>
                    {this.props.info}
                    <h1 style = {style}> Hello World!</h1>
                </div>
            )
    }
})

ReactDOM.render(
    <App info="boom"/>,
    document.getElementById('app')
)
```

### Conditional JSX

Very commonly we want to add conditional logic to our JSX. We can add ternary logic, or isolate our information into a separate function, or place code inside of `render`.

```js
var App = React.createClass({
    determineInfo: function(){
        if(this.props.info === 'person'){
            return <h1>Hello Person!</h1>
        } else {
            return <h1>Hello Anything else!</h1>
        }
    },
    render: function(){
        if(this.props.info === "thing"){
            var data = "nice!"
        } else {
            var data = "meh"
        }
        return (
                <div>
                    <p>{this.props.info}</p>
                    <p>{data}</p>
                    {this.determineInfo()}
                    {this.props.info == "awesome" ? 
                        <h1>Nice!</h1>
                        :
                        <h1>Not nice!</h1>
                    }
                </div>
            )
    }
})

ReactDOM.render(
    <App info="boom"/>,
    document.getElementById('app')
)
```

At the bottom, try changing the value you pass in to `info` to some other value. How can you get `Nice!` to show? How can you get `Hello Person!` to show?

What we've learned so far is fine for the very basics of React, but as we build larger applications, we need a better tool for transpiling our code, and `webpack` is going to help us do that. Webpack is a standard when writing React code and it has a very steep learning curve, but with a little bit of practice you'll get the hang of it. Not only does it allow us to easily include `babel`, it also gives us access to some of the best and latest features in JavaScript, specifically `modules`. We'll talk about webpack in the next chapter.

### Exercise

Complete the [JSX](https://github.com/rithmschool/react_curriculum_exercises/blob/master/Unit-01/02-jsx/readme.md) exercises.

#### [⇐ Previous](./01-intro.md) | [Table of Contents](./../readme.md) | [Next ⇒](./03-webpack.md)
