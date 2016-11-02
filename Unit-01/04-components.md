#### [⇐ Previous](./03-webpack.md) | [Table of Contents](./../readme.md) | [Next ⇒](./03-props_state.md)

# Component Architecture

### Objectives

By the end of this chapter, you should be able to:

- Understand how to architect and application using components
- Explain what component hierarchy is and diagram a simple component based application

### Component Hierarchy

One of the best tutorials on how to structure React applications and determine what should be a component is from the docs [here](https://facebook.github.io/react/docs/thinking-in-react.html).

### Structuring React Applications

Another important thing to think about when building React applications is a folder structure! For now we will be placing our `bundle.js` in the root directory and our javascript (our components and `index.js` file in a `js` folder). We will also make sure we have a `.gitignore` file for our node modules

```sh
.
├── bundle.js
├── js
│   ├── components
│   │   ├── Another.jsx
│   │   ├── App.jsx
│   │   └── Main.jsx
│   └── index.js
├── package.json
└── webpack.config.js
```

### React Dev Tools

Facebook offers a very helpful debugging tool for React called the React Developer Tools, which is an extention for the Chrome Dev Tools. You can install it [here](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

### Exercise

#### [⇐ Previous](./03-webpack.md) | [Table of Contents](./../readme.md) | [Next ⇒](./03-props_state.md)