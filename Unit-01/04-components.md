#### [⇐ Previous](./03-webpack.md) | [Table of Contents](./../readme.md) | [Next ⇒](./05-props_state.md)

# Component Architecture

### Objectives

By the end of this chapter, you should be able to:

- Understand how to architect an application using components
- Explain what component hierarchy is and diagram a simple component based application

### Component Hierarchy

As you continue to build React applications, you will begin to better understand just how much logic should go into a component before splitting into multiple components. One of the best tutorials on how to structure React applications and determine what should be a component is from the docs [here](https://facebook.github.io/react/docs/thinking-in-react.html).

### Structuring React Applications

Another important thing to think about when building React applications is a folder structure! For now we will be placing our `bundle.js` in the root directory and our javascript (our components and `index.js` file) in a `js` folder. We will also make sure we have a `.gitignore` file for our node modules:

```sh
.
├── bundle.js
├── js
│   ├── components
│   │   ├── Another.jsx
│   │   ├── App.jsx
│   │   └── Main.jsx
│   └── index.js
├── index.html
├── package.json
└── webpack.config.js
```

### React Dev Tools

Facebook offers a very helpful debugging tool for React called the React Developer Tools, which is an extention for the Chrome Dev Tools. You can install it [here](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi). This will give you access to a tab called "React" in the chrome dev tools where you can examine your components and see all essential information about them. 

### Exercise

#### [⇐ Previous](./03-webpack.md) | [Table of Contents](./../readme.md) | [Next ⇒](./05-props_state.md)
