#### [⇐ Previous](./01-intermediate_react.md) | [Table of Contents](./../readme.md) | [Next ⇒](./03-react_router.md)

# Testing

### Objectives

By the end of this chapter, you should be able to:

- Use `jest` to test components
- Test redux actions and reducers

### Getting Started with Jest

[Jest](https://facebook.github.io/jest/) is a wonderful testing library created by Facebook to help test JavaScript code as well as easily test React components and much more. What's great about Jest is it not only is included with `create-react-app` (you can read more about that [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)), but with Jest - your tests run in parallel so they are executed much faster than most testing frameworks.

So Let's first start by creating a react application and let's write some simple tests!

### Writing Simple Specs with Jest

We can use Jest without React so it's important to understand how that works. Before we start testing our components, let's write some simple specs with Jest and see how the built in `test` and `expect` functions work.

Let's first get started with a simple `create-react-app` application so let's run in terminal, `create-react-app learn-testing && cd learn-testing`.

Inside of here we can run our specs by typing `yarn test` and we will see that we have one spec passing - here's what you should see:

```sh
 PASS  src/App.test.js
  ✓ renders without crashing (25ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.393s
Ran all test suites related to changed files.

Watch Usage
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

Notice here that we are in watch mode which will constantly look for changes in our test files - and this is coming from our `App.test.js` file, which looks like this

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
```

We can see here that we easily can test that the application has rendered, but before we jump into testing our components, let's get to learn `jest` a bit better. Let's start by making a file called `learn.test.js` and inside add the following

```js
test("it works", function() {
  expect(1).toBe(1);
});
```

Notice that we are using the word `test` - this is very similar to `it` with Jasmine or Mocha. You can actually use the `it` and `describe` keywords if you'd like, but you will commonly see `test` when using Jest.

### Matchers

Similar to Jasmine or Mocha, Jest has quite a few functions used for assertions/expectations. You can see a full list [here](https://facebook.github.io/jest/docs/en/expect.html), but here are some common ones

- `toBeDefined`
- `toBeGreaterThan / toBeLessThan`
- `toBe` (uses === to compare)
- `toEqual` (for deep object comparison)
- `toContain` (see if a value is inside of a collection)

### Folder structure for tests

You also might not want to place all of your test files with your files in the `src` folder so in order for Jest to read your tests, place them in a folder called `__tests__` inside of the `src` folder.

Make sure that your folder is called `__tests__` - this is essential!

### Snapshot Testing

Now that we have a basic understanding of how to use Jest, let's discuss a nice feature it provides called Snapshot Testing.

### Adding Enzyme

Now that we can run simple specs and take snapshots of our components, let's see how we can test exactly what a component is rendering as well as certain props that it will have. 

To do this, we're going to install an additional library called Enzyme which is made by the wonderful people at AirBnB. Enzyme uses React testing utilities, but it is a nice abstraction and makes testing components quite easy.

### Coverage

As you start writing more tests, it's good to know how much of your application is covered with tests. The metric that we use to determine what percent of our code is covered by tests is called "coverage" and it is a described as a percent of lines of code that have test "coverage"


### Challenges with Testing UI

One of the biggest challenges around testing UI is that your UI will so frequently change. This means that tests can become obsolete quickly and will need to be re-written quite often. It is useful to understand how to test UIs with React, but it is also important to understand just how often your code is going to change. 

This does not mean that all UI code should not be tested. If you are working wiht data that will be put into your UI - that should absolutely be tested, but if you are only testing certain markup on a page, that can become obsolete quite quickly.

#### [⇐ Previous](./01-intermediate_react.md) | [Table of Contents](./../readme.md) | [Next ⇒](./03-react_router.md)
