#### [⇐ Previous](./03-testing.md) | [Table of Contents](./../readme.md) | [Next ⇒](./05-redux_intro.md)

# React Router

### Objectives

By the end of this chapter, you should be able to:

- Use `react-router` to build navigation for single page applications
- Compare and contrast client-side and server-side routing

### Introduction

### Essential Components

#### <Router></Router>
#### <Route / >
#### <Link / >

### Getting Started

Before we see the router components Let's first build a simple React application with webpack.

```sh
take learn_react_router
npm init -y
npm install --save babel-core babel-loader babel-preset-es2015 babel-preset-react react react-dom react-router
touch webpack.config.js .babelrc index.html
mkdir src
touch src/index.js
mkdir src/components
touch src/components/App.js
```

Now let's create a `webpack.config.js` and `babelrc`.

### Hash History + Browser History

### 404

### Nested Routes

### Active Links

### Index Routes + Links

### URL Parameters and Query String access

### Passing information from a parent route to child route

### Exercise

#### [⇐ Previous](./03-testing.md) | [Table of Contents](./../readme.md) | [Next ⇒](./05-redux_intro.md)