#### [⇐ Previous](./02-jsx.md) | [Table of Contents](./../readme.md) | [Next ⇒](./04-components.md)

# Webpack

### Objectives

By the end of this chapter, you should be able to:

- Explain what `webpack` and `babel` are useful for
- Configure applications using `webpack`

### Introduction + Installing Webpack

So what is `webpack`? You will commonly hear it defined as a module bundler, or build tool. We learned about modules in Python; in that context, a module was just a chunk of code that had been encapsulated into its own file. While a similar system is coming to JavaScript, it isn't quite there yet; in the meantime, tools like `webpack` let us create modules in a relatively seamless way. In other words, `webpack` allows us to easily create modules and then bundle our code together. This makes it very easy for us to write modular code using common.js modules (node.js syntax with `require`) or es2015 modules (with a very similar syntax to python modules).


### Essential Files

#### `package.json`

Since we will be using `npm` which is the package manager for `node.js` to fetch packages (`react`, `webpack` etc). We will want to create a `package.json`. A package.json is a file that describes the application you are building and lists all of the dependencies and development dependencies (which are not installed in production). The dependencies section of a `package.json` is very similar to what you see when you type `pip list` in the terminal for one of your Python projects.

To create a `package.json` file you can type in `npm init` and then add whatever additional information you want or just keep pressing enter. Almost all of the time, you will not need to edit this file when initializing so you can pass in the `-y` flag to confirm everything.

Let's create our first package.json file using `npm init -y`

#### Installing dependencies

Now that we have a `package.json` file configured, let's install all the necessary dependencies entering the following in your terminal:

```sh
npm install --save-dev babel-core babel-loader \
                       babel-preset-es2015 webpack \
                       webpack-dev-server
```

The `--save-dev` flag will save the names and versions of these modules to the `package.json` file in a section called `devDependencies`.  `devDependencies` are dependencies that you need for development, but not production code. Listing your dependencies in a package.json file is essential when working with other developers as they can easily install all dependencies by simply running `npm install` in the terminal.

### Creating our first webpack.config.js

Now that we have a `package.json` and required dependencies. Let's create the configuration file for `webpack`. This file is called `webpack.config.js` - let's see what goes inside.

**context** - the _absolute_ path to your project.  Typically, `__dirname` is used in the path

**entry** - the file where we will start bundling. Usually this file is the one that contains your initial `ReactDOM.render` call.

**output** - this object contains a few keys related to where the bundle will be output to
  - *path* - the location for where the bundle should be saved
  - *filename* - the name of the file you want to call your bundle

**devtool** - this is very useful for debugging purposes. We will be using `inline-source-map` to see where in our bundle errors are occuring.

**module** - this object can contain quite a few things, we are only concerned now with a key called `rules`

  - *rules* - the value is an array of rules used for transpiling and bundling. Inside of each value in the array, we pass in an object with the following keys
    - *use* - the loader to load for this rule.  In the example, the loader will transpile
    - *test* - what files to look for (regular expression)
    - *exclude* - what files to exclude from bundling

```js
module.exports = {
  // The absolute path to your project
  context: __dirname + "/",
  // the entry point for our app
  entry: './main.js',
  // where to put the compiled output (what our script tag will link to)
  output: {
    // where does it go?
    path: __dirname + "/",
    // what is the file called?
    filename: 'bundle.js'
  },
  // how can we debug our bundle? for production, we can use 'source-map'
  devtool: 'inline-source-map',
  module: {
    rules: [{
      //Check for all js files
      test: /\.js$/,
      // Don't include node_modules directory in the search for js files
      exclude: /node_modules/,
      // Use the babel-loader plugin to transpile the javascript
      use: [{
        loader: 'babel-loader',
        options: { presets: ['es2015'] }
      }]
    }]
  }
};
```


#### .babelrc

Since we have included `babel` as a loader, there is one more file that we need to configure. This file is called a `.babelrc` and it specifies which babel "presets" or plugins we want to use. The one we will be using is for ES2015. This allows us to use `es2015` modules, which we will see in the next section! Let's create a `.babelrc` file, it's quite small, but essential.

```json
{
    "presets": ["es2015"]
}
```

### Webpack Dev Server

Another nice tool we can use is the webpack-dev-server which watches for changes in our files and starts a development server for us. To install it, use `npm install -g webpack-dev-server`. To run the server just type `webpack-dev-server`

### ES2015 modules 

Before we start learning about ES2015 modules, let's make sure we have a proper setup, including a well-organized file and folder structure. We will be using an entry file called `main.js` and a file called `index.html` to serve content, and a folder called `helpers` with some helper files. Here is what our folder structure should look like

```sh
.
├── helpers
│   └── functions.js
│   └── default.js
├── node_modules
├── index.html
├── main.js
├── package.json
└── webpack.config.js
```

Here is our `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <h1>Hello!</h1>
    <script src="bundle.js"></script>
</body>
</html>
```

We should be to run `webpack-dev-server` and head to [localhost:8080](localhost:8080) and see our page. Now that we have configured webpack to use babel with es2015 modules, let's take a look at how they work!

#### export

To export values to other modules we use the `export` keyword

Inside `helpers/functions.js`

```js
export function sayHi(){
    console.log("hi!");
}

export function sayBye(){
    console.log("bye!");
}

const instructor = "Elie"
const instructor2 = "Tim"
const instructor3 = "Matt"
export {instructor, instructor2, instructor3}

```

#### default

If we want to export a single value or to have a fallback value for our module, we can use a default export. It is not possible to use `var`, `let`, or `const` with export default.

Inside `helpers/default.js`

```js
export default class Person {
    constructor(firstName, lastName){
        this.firstName = firstName
        this.lastName = lastName
    }
    static isPerson(person){
        return person instanceof this
    }
    fullName(){
        return `${this.firstName} ${this.lastName}`
    }
}
```

#### import

To import modules, we use the `import` keyword. Here is what our `main.js` file looks like:

```js
import { sayHi, sayBye, instructor,instructor2,instructor3 } from './helpers/functions';
import Person from './helpers/default'

sayHi()
sayBye()

console.log(instructor)
console.log(instructor2)
console.log(instructor3)

const p = new Person('Elie', 'Schoppik')

console.log(Person.isPerson(p))

console.log(p.fullName())
```

There are quite a few things we can do with the `import` keyword, you can read about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

### Using webpack with React

Now that we understand how to use modules, let's add React to the mix! We can keep the same exact setup, but just add a few more modules for react and a babel preset!

```sh
npm install --save-dev babel-preset-react react react-dom
```

In our `webpack.config.js` we have to make one small change.  For the test property inside of our rules, we are changing the test to `/\.jsx?$/`:

```js
module.exports = {
  // The absolute path to your project
  context: __dirname + "/",
  // the entry point for our app
  entry: './main.js',
  // where to put the compiled output (what our script tag will link to)
  output: {
    // where does it go?
    path: __dirname + "/",
    // what is the file called?
    filename: 'bundle.js'
  },
  // how can we debug our bundle? for production, we can use 'source-map'
  devtool: 'inline-source-map',
  module: {
    rules: [{
      //Check for all js files
      test: /\.jsx?$/,
      // Don't include node_modules directory in the search for js files
      exclude: /node_modules/,
      // Use the babel-loader plugin to transpile the javascript
      use: [{
        loader: 'babel-loader',
        options: { presets: ['es2015'] }
      }]
    }]
  }
};
```

and a `.babelrc file`

```js
{
  "presets": ["es2015", "react"]
}
```

### React with es2015 class syntax

Now that we have included React into our application, we can create React components using `ES2015 syntax!`. This syntax is a bit different then `React.createClass()`, but it is the standard in Facebook docs and Facebook is eventually planning on removing `createClass` from React (but not for a long time). Here's what that syntax looks like

```js
import React, {Component} from 'react'
import {render} from 'react-dom'

// the extends keyword is a shorthand for inheritance in es2015 class syntax. it is NOT a new feature of the language, just an abstraction of what you have seen before.
class App extends Component {
  // if you want to set props, you do it in the constructor
  constructor(props){
    // but first you have to call super() for any parent props
    super(props)
  }
  render(){
    return(
        <div>Hello World!</div>
      )
  }
}

render(<App/>, document.getElementById("app"))
```

### Webpack-dev-server

Instead of building and refreshing the page each time, we can use a lightweight server to start our applications. This involes installing wepack-dev-server and running webpack-dev-server in the terminal. We can include additional configuration in our webpack.config.js. We can also pass other flags to our webpack-dev-server command including hot module reloading (reloading the same state without needing to refresh the page!) using --hot when we start the server.

### Webpack for production

The easiest way to minify and compress files is to run `webpack -p` and then include that file, but how can we distinguish between production and development environments? The best way is to not export an object, but a function!

```
module.exports = (env) => {
  return {
      // config goes here
      devtool: env.prod ? 'source-map': 'inline-source-maps'
    }
}
```

`webpack -p --env.prod`

If you don't want to use ternary operators there is a module called `webpack-utils` which provides nice helper functions for determining if in production or not.

### Webpack validator

To make things **much** easier when working with webpack we can install the webpack-validator module, require it in our `webpack.config.js` file and call it around the module.exports

```
module.exports = () => {
  return webpackValidator({
      // config goes here
    })
}
```

### Resolve

When we import our files, we have to include the extentions like this:

```js
import App from './components/App.jsx'
import Second from './components/utils/Second.jsx'
```

There is a handy key in the `webpack.config.js` called `resolve`, which helps us with this. Many `webpack.config.js` files have a resolve extensions property that has an empty string like shown below. The empty string is there to help resolve imports without extensions

```
{
    resolve: {
      extensions: [‘’, ‘.js’, ‘.jsx’]
    }
}
```

### PublicPath

```
// update the URLs inside CSS, HTML files when generating production builds.
        publicPath: './'
```

You can read more about it [here](https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.rnhxkn9rc)


### Using Class syntax vs. createClass

You can read more about the differences between these two [here](https://toddmotto.com/react-create-class-versus-component). There are quite a few opinions as to which one is better, but we will be using the `class` syntax as that is what the docs use and will continue to use. They both accomplish the same thing, but have some syntax differences. 

### External Resources

[- https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.ahhz90ekm ](- https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.ahhz90ekm )

### Exercise

Complete the [webpack](https://github.com/rithmschool/react_curriculum_exercises/tree/master/Unit-01/03-webpack) exercises.

#### [⇐ Previous](./02-jsx.md) | [Table of Contents](./../readme.md) | [Next ⇒](./04-components.md)