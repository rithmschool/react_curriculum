#### [Table of Contents](./../readme.md) | [Next ⇒](./02-new_structure.md)

# Webpack

### Objectives

By the end of this chapter, you should be able to:

- Explain what `webpack` and `babel` are useful for
- Configure applications using `webpack`

### Installing Webpack

`npm install -g webpack-dev-server`
`npm install -g webpack`

### Essential Files

#### package.json

#### webpack.config.js

To install webpack we need to first create a `package.json` file. This file 

`npm install --save babel-core babel-loader babel-preset-es2015` 

### Creating our first webpack.config.js

```js
module.exports = {
    // where we start bundling our code
    entry: 'main.js',
    // where it gets output to (what our script tag will link to)
    output: {
        // where does it go?
        path: './',
        // what is the file called?
        filename: 'bundle.js'
    },
    module: {
    loaders: [{
      // what loader are we using
      loader: 'babel'
      // what files should we look for
      test: /\.js$/,
      // what files should we exclude
      exclude: /node_modules/,
      }]
    }
}
```

#### .babelrc

And now let's create a `.babelrc` file

```json
{
    "presets": ["es2015"]
}
```

### ES2015 modules 

#### import
#### export
#### default

### Using webpack with React


```sh
npm install -y
npm install --save babel-core babel-loader babel-preset-es2015 babel-preset-react react react-dom
```

Then let's create a `webpack.config.js`

```js
module.exports = {
  entry: './js/index.js',
  output: {
    path: './',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
        {
          loader: 'babel',
          test: /\jsx?$/,
          exclude: /node_modules/
        }
      ]
  },
  devServer: {
    contentBase: './'
   },
  devtool: 'inline-source-map'
}
```

and a `.babelrc file`

```js
{
  "presets": ["es2015", "react"]
}
```

### Using Class syntax vs. createClass

[https://toddmotto.com/react-create-class-versus-component/](https://toddmotto.com/react-create-class-versus-component/)

### Exercise

#### [Table of Contents](./../readme.md) | [Next ⇒](./02-new_structure.md)