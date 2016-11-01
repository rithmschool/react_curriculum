#### [⇐ Previous](./01-intro.md) | [Table of Contents](./../readme.md) | [Next ⇒](./03-components.md)

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

Instead of using `React.DOM` we can actually write HTML that gets converted into that code! But how do we "convert" our JSX into JavaScript? We need a little bit of help from a transpiler. Enter `babel`.

Make sure that you have the `javascript-babel` syntax highlighting for Sublime or else you will get some pretty ugly looking code.

### Babel

In order to convert our JSX to JavaScript (what we wrote before), we need to transpile our code. Our tool to transpile is going to be `babel`. To include babel, we can add the cdn `<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"></script>` and include a script with an attribute of `text/jsx`

```html
<script src ="https://fb.me/react-15.0.0-rc.1.js"></script>
<script src="https://fb.me/react-dom-15.0.0-rc.1.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"></script>
<script type="text/jsx"></script>
```

Let's see what some more JSX looks like:

```js
var App = React.createClass({
    render: function(){
        var style = {color: 'red'}
        return (
                <div>
                    {this.props.info}
                    <h1 style = {style}> Hello World!</h1>
                    }
                </div>
            )
    }
})
```

So what we have done is good for learning the very basics of React, but as we build larger applications, we need a better tool for transpiling our code and `webpack` is going to help us do that. Webpack is a standard when writing React code and it has a very steep learning curve, but with a little bit of practice you'll get the hang of it. Not only does it allow us to easily include `babel`, and it gives us access to easily use some of the best and latest features in JavaScript, specifically `modules`.

### Conditional JSX

Very commonly we want to add conditional logic to our JSX. We can add ternary logic, or isolate or information into a separate function

```js
var App = React.createClass({
    determineInfo: function(){
        if(this.props.info === 'person'){
            <h1>Hello Person!</h1>
        } else {
            <h1>Hello Anything else!</h1>
        }
    }
    render: function(){
        var style = {color: 'red'}
        return (
                <div>
                    {this.props.info}
                    <h1 style = {style}> Hello World!</h1>
                    }
                    {determineInfo}
                    {this.props.info == "awesome" ? 
                        <h1>Nice!</h1>
                        :
                        <h1>Not nice!</h1>
                    }
                </div>
            )
    }
})
```

### Exercise

#### [⇐ Previous](./01-intro.md) | [Table of Contents](./../readme.md) | [Next ⇒](./03-components.md)