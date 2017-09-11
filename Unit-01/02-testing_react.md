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

Notice that we are using the word `test` - this is very similar to `it` with Jasmine or Mocha. You can actually use the `it` and `describe` keywords if you'd like as well!

### Matchers

Similar to Jasmine or Mocha, Jest has quite a few functions used for assertions/expectations. You can see a full list [here](https://facebook.github.io/jest/docs/en/expect.html), but here are some common ones.

- `toBeDefined`
- `toBeGreaterThan / toBeLessThan`
- `toBe` (uses === to compare)
- `toEqual` (for deep object comparison)
- `toContain` (see if a value is inside of a collection)

### Folder structure for tests

You also might not want to place all of your test files with your files in the `src` folder so in order for Jest to read your tests, place them in a folder called `__tests__` inside of the `src` folder.

Make sure that your folder is called `__tests__` - this is essential! Inside of the `__tests__` folder we can place all of the files that we'd like Jest to run

### Snapshot Testing

Now that we have a basic understanding of how to use Jest, let's discuss a nice feature it provides called Snapshot Testing.

Imagine for a second we have a component that looks like this

```js
import React from "react";

const SimpleComponent = props => (
  <div>
    <h1>Hello there!</h1>
    <p>First Name - {props.first}</p>
    <p>Last Name - {props.last}</p>
    <p>Favorite Food - {props.favFood}</p>
  </div>
);

export default SimpleComponent;
```

If we wanted to test this component we could write all the specs to make sure that when we render the component there are three paragraph tags, one `h1` tag and that props are being correctly set on the component. 

However, when one small change is made to our UI, this test will fail and we'll have to go edit the test again to account for new UI changes. This process is quite tedious, but thankfully Jest has an excellent alternative - snapshot testing.

The way snapshot testing works is that Jest will take a snapshot of your component and when future tests are run, it will alert you of any differences between the current snapshot and a previous one. If you would like to update the snapshot, you can simply add a `-u` flag and update with a new snapshot.

Snapshot testing does not cover all cases, there will be times where you want to test the functionality of a component, but when testing stateless functional components, snapshot testing is esspecially useful since you don't anticipate these components changing frequently.

Enough about Snapshot testing - let's see the code! In our `src` folder, let's create a new file called `SimpleComponent` and place the following code:

```js
import React from "react";

const SimpleComponent = props => (
  <div>
    <h1>Hello there!</h1>
    <p>First Name - {props.first}</p>
    <p>Last Name - {props.last}</p>
    <p>Favorite Food - {props.favFood}</p>
  </div>
);

export default SimpleComponent;
```

Now in our `__tests__` folder, let's add the following code

```js
import React from "react";
import SimpleComponent from "../SimpleComponent";
import renderer from "react-test-renderer";

describe("<SimpleComponent />", () => {
  it("matches the snapshot", () => {
    var tree = renderer.create(<SimpleComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

When we run `yarn test` we should see everything passing! We can also see that in our `__tests__` folder, a folder called `__snapshots__` has been created. In here, we can see our SimpleComponent.test.js.snap file which looks like this: 


```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`<SimpleComponent /> matches the snapshot 1`] = `
<div>
  <h1>
    Hello there!
  </h1>
  <p>
    First Name - 
  </p>
  <p>
    Last Name - 
  </p>
  <p>
    Favorite Food - 
  </p>
</div>
`;
```

This is the saved snapshot! Now let's go and edit our SimpleComponent.js file and insert a new `h2` which says Welcome! And let's see what happens with our test. We now see that there is a failing test because the snapshots are different! So we are faced with two choices here

1 - go fix the component because this UI change is not something we wanted
2 - update the snapshot to include our new UI

In our terminal, there is an option for us to press `u` to update the snapshot, so let's do that and we should see the tests are passing again!

Snapshot testing is fantastic as a really quick and easy way to test the UI of components.

### Adding Enzyme

Now that we can run simple specs and take snapshots of our components, let's see how we can test exactly what a component is rendering as well as certain props that it will have. 

To do this, we're going to install an additional library called Enzyme which is made by the wonderful people at AirBnB. Enzyme uses React testing utilities, but it is a nice abstraction and makes testing components quite easy.

In the previous example with snapshot testing, we imported the renderer function from "react-test-renderer". These functions which are part of the React testing utilities are not always the easiest to use, esspecially when you need to find certain elements on the page. To make this easier, we're going to use Enzyme which uses a very similar DOM selection API to jQuery (it uses a library called Cheerio, which you might have come across when learning about web scraping with node).

To get started we simply need to run `npm install --save-dev enzyme react-test-renderer` to install it! The `react-test-renderer` is necessary for rendering our components while testing.

We're going to be using Enzyme to test the content of our React Components and when using Enzyme there are three different functions we can use: 

### shallow  

Shallow rendering : Is useful to test a component in isolation of every other. In the typical React pattern of smart and dumb components, shallow rendering is usually used to test ‘dumb’ components (stateless components) in terms of their props and the events that can be simulated. You will find yourself using shallow most of the time

You can read more about it [here](https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md)

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import Child from "../Child";
import { shallow } from "enzyme";

test("should render one <Child /> component", () => {
  const wrapper = shallow(<App />);
  console.log("WRAPPER!", expect(wrapper.find(Child)));
  expect(wrapper.find(Child)).toHaveLength(1);
});

test("should render with a class of App-header", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(".App-header")).toHaveLength(1);
});
```

### mount  

Mounting : Also known as full DOM rendering, it allows you to render a part of the DOM tree and it also gives you access to the lifecycle methods of React components (ComponentWillMount, ComponentWillReceiveProps , etc…)

You can read more about it [here](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md)

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import Child from "../Child";
import { shallow, mount } from "enzyme";

test("should render one <Child /> component", () => {
  const wrapper = shallow(<App />);
  console.log("WRAPPER!", expect(wrapper.find(Child)));
  expect(wrapper.find(Child)).toHaveLength(1);
});

test("should render with a class of App-header", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(".App-header")).toHaveLength(1);
});

test("mount allows us to set props", () => {
  const wrapper = mount(<App />);
  wrapper.setProps({ name: "foo" });
  expect(wrapper.props().name).toEqual("foo");
});
```

### render  

Static rendering : Is sparsely used but when it is the case, serves as means of testing plain JSX / HTML.

You can read more about it [here](https://github.com/airbnb/enzyme/blob/master/docs/api/render.md)

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import Child from "../Child";
import { shallow, mount, render } from "enzyme";

test("should render one <Child /> component", () => {
  const wrapper = shallow(<App />);
  console.log("WRAPPER!", expect(wrapper.find(Child)));
  expect(wrapper.find(Child)).toHaveLength(1);
});

test("should render with a class of App-header", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(".App-header")).toHaveLength(1);
});

test("mount allows us to set props", () => {
  const wrapper = mount(<App />);
  wrapper.setProps({ name: "foo" });
  expect(wrapper.props().name).toEqual("foo");
});

test("should render with a name prop of elie", () => {
  const wrapper = render(<App name="Elie" />);
  expect(wrapper.text()).toContain("Hi Elie");
});

test("should render with a name prop of elie", () => {
  const wrapper = render(<App name="Bob" />);
  expect(wrapper.text()).toContain("You're not Elie");
});
```

If you are wondering when to use each of these methods, you can read a great post [here](https://stackoverflow.com/questions/38710309/when-should-you-use-render-and-shallow-in-enzyme-react-tests)

### Coverage

As you start writing more tests, it's good to know how much of your application is covered with tests. The metric that we use to determine what percent of our code is covered by tests is called "coverage" and it is a described as a percent of lines of code that have test "coverage"

Let's see what our application looks like so far with coverage! 

`yarn test -- --coverage `

When we run this, we will see a nice looking table to show how much coverage our code has. This is done on a per file basis and gives us a useful metric for how well our code has been tested. It's not realistic that you will always have 100% coverage or that 100% coverage will prevent all bugs, so there are diminishing returns if you try to overly maximize your coverage. It's essential to test your code, but you don't have to go overboard with coverage.

### Challenges with Testing UI

One of the biggest challenges around testing UI is that your UI will so frequently change. This means that tests can become obsolete quickly and will need to be re-written quite often. It is useful to understand how to test UIs with React, but it is also important to understand just how often your code is going to change. 

This does not mean that all UI code should not be tested. If you are working with data that will be put into your UI - that should absolutely be tested, but if you are only testing certain markup on a page, that can become obsolete quite quickly.

### Additional Resources

[https://www.theodo.fr/blog/2017/04/enzyme-fast-and-simple-react-testing/](https://www.theodo.fr/blog/2017/04/enzyme-fast-and-simple-react-testing/)

#### [⇐ Previous](./01-intermediate_react.md) | [Table of Contents](./../readme.md) | [Next ⇒](./03-react_router.md)
