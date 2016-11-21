#### [Table of Contents](./../readme.md) | [Next ⇒](./02-jsx.md)

# Introduction to React

### Objectives

By the end of this chapter, you should be able to:

- Explain what a front-end framework is 
- Compare and contrast frameworks like `angular`, `ember`, and `react`
- Understand what the virtual-dom is and how React works

### Introduction

React is a wonderful library for the view layer. You can use React on its own for a single page application as it is very un-opinionated.  This is a stark contrast to frameworks like Angular, which have their own entire standard for how to build front-end applications. The idea behind React is to create a UI that is comprised of `components`. Components are pieces of UI code that can be composed together to form larger UIs. Components can render HTML, or other components, or even pass properties from one component to another. 

What makes React so wonderful is that its API is quite small and it has a relatively small learning curve, unlike other frameworks. React also enforces some of the best practices in JavaScript and web development, which make it a great library to learn even if you don't use it every day. However, there are a couple tools like `webpack` which add some complexity, but we will be going through them in great detail. When you start reading about React, you may hear terms like es2015 modules, JSX, redux and all sorts of other buzz words, but to get started with React - you just need to write a little bit of JavaScript! 

Let's jump in an write our first React code! To get started, let's make sure we have the two scripts necessary for rendering a component in the DOM. The first is the React library and the second is the ReactDOM library, which is used for rendering to the DOM. These libraries are isolated as there are environments where we can use React and not have access to a DOM (like mobile development, game development or even command line scripts).

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script src="https://unpkg.com/react@15/dist/react.js"></script>
    <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
    <script>
        // React is a global from the React library
        var div = React.DOM.div; // let's create a div!
        var h1 = React.DOM.h1; // let's create an h1!

        var App = (
            div(null,
                h1(null, 'Hello World!')
            )
        )

        // lets put this on the DOM
        ReactDOM.render(App, document.getElementById("app"))
    </script>
</body>
</html>
```

If we open this in the browser we should see "Hello World!". This may look quite strange, so lets talk more about what we did. `div`, `h1` are actually functions, and `null` that we pass in is an attribute and the second is the innerHTML for that element. Now we said that React is all about "components", but we have just been using existing HTML elements so let's make another one!

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script src="https://unpkg.com/react@15/dist/react.js"></script>
    <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
    <script>
        
        // React is a global from the React library
        var div = React.DOM.div; // let's create a div!
        var h1 = React.DOM.h1; // let's create an h1!

        var myComponent = React.createClass({
            render: function(){
                return (
                       div(null,
                            h1(null, "My very first component!")
                        ) 
                )
            }
        })
        
        var App = (
            div(null,
                h1(null, 'Hello World!'),
                // now lets add our component!
                React.createElement(myComponent, null)
            )
        )

        // lets put this on the DOM
        ReactDOM.render(App, document.getElementById("app"))
    </script>
</body>
</html>
```

Now let's see what that looks like! We just made up our own component and we can start using it anywhere! But our components are pretty rigid, how can we add some flexibility to them! Let's introduce a concept called `props`. We can think of these as "properties" for our components. Let's see what they look like.

```html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script src="https://unpkg.com/react@15/dist/react.js"></script>
    <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
    <script>
        
        // React is a global from the React library
        var div = React.DOM.div; // let's create a div!
        var h1 = React.DOM.h1; // let's create an h1!

        var myComponent = React.createClass({
            render: function(){
                return (
                       div(null,
                            h1(null, "My very first component!"),
                            h1(null, "Hello " + this.props.name),
                        ) 
                )
            }
        })
        
        var App = (
            div(null,
                h1(null, 'Hello World!'),
                // now lets add our component!
                React.createElement(myComponent, null)
                React.createElement(myComponent, {name: "Elie"})
                React.createElement(myComponent, {name: "Tim"})
                React.createElement(myComponent, {name: "Matt"})
            )
        )

        // lets put this on the DOM
        ReactDOM.render(App, document.getElementById("app"))
    </script>
</body>
</html>
```

So we've done some pretty cool stuff here, but you might be thinking - this syntax is a bit strange. Thankfully there is another way of using JavaScript to write HTML with a language called `JSX`. JSX might be a bit tricky to get used to at first, but it's the standard when writing React and can do some pretty incredible things once you get used to it.

### Exercise



#### [Table of Contents](./../readme.md) | [Next ⇒](./02-jsx.md)