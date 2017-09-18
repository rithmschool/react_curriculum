#### [⇐ Previous](./01-intermediate_react.md) | [Table of Contents](./../readme.md) | [Next ⇒](./03-react_router.md)

# Testing

### Objectives

By the end of this chapter, you should be able to:

- Test your components with `jest`, `react-test-renderer`, and `enzyme`
- Explain what snapshot testing is
- Compare the `shallow`, `mount`, and `render` functions in `enzyme`
- Explain what coverage is, and find the test coverage percentage in your React apps

### Getting Started with Jest

[Jest](https://facebook.github.io/jest/) is a wonderful testing library created by Facebook to help test JavaScript code, React components, and much more. What's great about Jest is it not only is included with `create-react-app` (you can read more about that [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)), but with Jest your tests run in parallel so they are executed much faster than most testing frameworks.

So let's create a new React application write some simple tests!

### Writing Simple Specs with Jest

We can use Jest without React, so it's important to understand how that works. Before we start testing our components, let's write some simple specs with Jest and see how the built in `test` and `expect` functions work.

Let's first get started with a simple `create-react-app` application. In the terminal, go ahead and write `create-react-app learn-testing && cd learn-testing`.

Inside of here we can run our specs by typing `npm test` and we will see that we have one spec passing - here's what you should see:

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

Notice here that we are in watch mode which will constantly look for changes in our test files. The one passing test is coming from `src/App.test.js`, the starter test file you get whenever you create a project with `create-react-app`. HThe conside inside of that file should look like this:

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
```

We can see here that we easily can test that the application has rendered, but before we jump into testing our components, let's get to learn `jest` a bit better. Start by making a file called `learn.test.js` in our `src` directory. Inside of this file, add the following:

```js
test("it works", function() {
  expect(1).toBe(1);
});
```

Notice that we are using the word `test` on the first line. This is very similar to `it` with Jasmine or Mocha. You can actually use the `it` and `describe` keywords if you'd like as well!

### Matchers

Similar to Jasmine or Mocha, Jest has quite a few functions used for assertions/expectations. You can see a full list [here](https://facebook.github.io/jest/docs/en/expect.html), but here are some common ones.

- `toBeDefined`
- `toBeGreaterThan / toBeLessThan`
- `toBe` (uses === to compare)
- `toEqual` (for deep object comparison)
- `toContain` (see if a value is inside of a collection)

Let's try out a few more examples of the syntax in `learn.test.js`:

```js
test("arithmetic", function() {
  expect(4 + 4).toBeGreaterThan(7);
  expect(4 + 4).toBeLessThan(9);
});

test("references", function() {
  var arr = [1, 2, 3];
  expect(arr).toEqual([1,2,3]);
  expect(arr).not.toBe([1,2,3]); // since === doesn't do deep comparison!
  expect(arr).toContain(1);
});
```

### Folder structure for tests

You also might not want to place all of your test files with your files in the `src` folder. In order for Jest to read your tests, place them in a folder called `__tests__` inside of the `src` folder.

Make sure that your folder is called `__tests__` - this is essential! Inside of the `__tests__` folder we can place all of the files that we'd like Jest to run.

### Snapshot Testing

Now that we have a basic understanding of how to use Jest, let's discuss a nice feature it provides called Snapshot Testing.

Imagine for a second we have a component that looks like this

```jsx
import React from "react";

const SimpleComponent = ({ first, last, favFood }) => (
  <div>
    <h1>Hello there!</h1>
    <h2>Welcome!</h2>
    <p>First Name - {first}</p>
    <p>Last Name - {last}</p>
    <p>Favorite Food - {favFood}</p>
  </div>
);

export default SimpleComponent;

```

If we wanted to test this component we could write all the specs to make sure that when we render the component there are three paragraph tags, one `h1` tag and that props are being correctly set on the component. 

However, when one small change is made to our UI, this test will fail and we'll have to go edit the test again to account for new UI changes. This process is quite tedious. Fortunately, Jest has an excellent alternative: snapshot testing.

The way snapshot testing works is that Jest will take a snapshot of your component and when future tests are run, it will alert you of any differences between the current snapshot and a previous one. If you would like to update the snapshot, you can simply add a `-u` flag and update with a new snapshot.

Snapshot testing does not cover all cases. There will be times where you want to test the functionality of a component. But when testing stateless functional components, snapshot testing is esspecially useful since you don't anticipate these components changing frequently.

Enough about Snapshot testing - let's see the code! First, we'll need to install another module, called `react-test-renderer, which is necessary for rendering our components while testing.

```sh
npm i --save-dev react-test-renderer
```

Next, in our `src` folder, let's create a new file called `SimpleComponent.js` and place the following code:

```jsx
import React from "react";

const SimpleComponent = ({ first, last, favFood }) => (
  <div>
    <h1>Hello there!</h1>
    <h2>Welcome!</h2>
    <p>First Name - {first}</p>
    <p>Last Name - {last}</p>
    <p>Favorite Food - {favFood}</p>
  </div>
);

export default SimpleComponent;

```

Now in our `__tests__` folder, let's add the following code in a file called `SimpleComponent.test.js`:

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

When we run `npm test` we should see everything passing! We can also see that in our `__tests__` folder, a folder called `__snapshots__` has been created. In here, we can see our SimpleComponent.test.js.snap file which looks like this: 


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

Now that we can run simple specs and take snapshots of our components, let's see how we can test exactly what a component is rendering, as well as certain props that it will have. 

To do this, we're going to install an additional library called Enzyme which is made by the wonderful people at AirBnB. Enzyme uses React testing utilities, but it is a nice abstraction and makes testing components quite easy.

In the previous example with snapshot testing, we imported the renderer function from `react-test-renderer`. These functions, which are part of the React testing utilities, are not always the easiest to use. This is especially true when you need to find certain elements on the page. To make this easier, we're going to use Enzyme, which uses a very similar DOM selection API to jQuery (it uses a library called Cheerio, which you might have come across when learning about web scraping with Node).

To get started we simply need to run `npm install --save-dev enzyme` to install it! 

We're going to be using Enzyme to test the content of our React Components. When using Enzyme, there are three different functions we can use: 

### `shallow`  

Shallow rendering: this is useful to test a component in isolation from every other component. In the typical React pattern of smart and dumb components, shallow rendering is usually used to test ‘dumb’ components (stateless components) in terms of their props and the events that can be simulated. You will find yourself using `shallow` most of the time.

You can read more about it [here](https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md).

To see this in action, let's continue with our earlier example by including our `SimpleComponent` inside of our `App` component:

```jsx
import React, { Component } from "react";
import logo from "./logo.svg";
import SimpleComponent from "./SimpleComponent";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <SimpleComponent first="Matt" last="Lane" favFood="ice cream" />
      </div>
    );
  }
}

export default App;
```

Next, let's modify the `App.test.js` file as follows: 

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import SimpleComponent from "../SimpleComponent";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

test("should render one <SimpleComponent /> component", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(SimpleComponent)).toHaveLength(1);
  expect(wrapper.find("h2")).toHaveLength(1);
});

test("should render with a class of App-intro", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(".App-intro")).toHaveLength(1);
});

```

As you can see, this test is able to detect that the `App` component consists of a single `SimpleComponent` child, and that there's an element with a class of `App-intro`. Note also that with shallow rendering, only one `h2` is found: this is the one inside of the `App` component, not the one inside of `SimpleComponent`.

### `mount`  

Mounting: Also known as full DOM rendering, it allows you to render a part of the DOM tree and it also gives you access to the lifecycle methods of React components (`componentWillMount`, `componentWillReceiveProps` , etc…)

You can read more about it [here](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md). For now, to highlight some simple differences between `shallow` and `mount`, let's add the following lifecycle hook to our `App.js`:

```js
componentDidMount() {
  this.setState({ name: "My app!" });
}
```

Next, let's modify our test file by importing `mount` and adding a couple more `test` blocks:

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import SimpleComponent from "../SimpleComponent";
import { shallow, mount } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

test("should render one <SimpleComponent /> component", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(SimpleComponent)).toHaveLength(1);
  expect(wrapper.find("h2")).toHaveLength(1);
});

test("should render with a class of App-intro", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(".App-intro")).toHaveLength(1);
});

test("should detect no state on shallow rendering", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.state()).toBeNull();
});

test("should detect state and all h2s on mounting", () => {
  const wrapper = mount(<App />);
  expect(wrapper.state("name")).toBe("My app!");
  expect(wrapper.find("h2")).toHaveLength(2);
});

```

### `render`  

Static rendering: Is sparsely used but when it is the case, serves as means of testing plain HTML. This may be useful if you care about testing the eventual HTML that gets rendered, and not the React Component structure.

You can read more about it [here](https://github.com/airbnb/enzyme/blob/master/docs/api/render.md). For now, let's import `render` and write one more test block:

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import SimpleComponent from "../SimpleComponent";
import { shallow, mount, render } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

test("should render one <SimpleComponent /> component", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(SimpleComponent)).toHaveLength(1);
  expect(wrapper.find("h2")).toHaveLength(1);
});

test("should render with a class of App-intro", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(".App-intro")).toHaveLength(1);
});

test("should detect no state on shallow rendering", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.state()).toBeNull();
});

test("should detect state and all h2s on mounting", () => {
  const wrapper = mount(<App />);
  expect(wrapper.state("name")).toBe("My app!");
  expect(wrapper.find("h2")).toHaveLength(2);
});

test("<SimpleComponent /> should have props show up", () => {
  const wrapper = render(<App />);
  expect(wrapper.text()).toContain("Matt");
  expect(wrapper.text()).toContain("Lane");
  expect(wrapper.text()).toContain("ice cream");
});

```

If you are wondering when to use each of these methods, you can read a great post [here](https://stackoverflow.com/questions/38710309/when-should-you-use-render-and-shallow-in-enzyme-react-tests)

### Coverage

As you start writing more tests, it's good to know how much of your application is covered with tests. The metric that we use to determine what percent of our code is covered by tests is called "coverage" and it is a described as a percent of lines of code that have test "coverage"

Let's see what our application looks like so far with coverage! 

`npm test -- --coverage `

When we run this, we will see a nice looking table to show how much coverage our code has. This is done on a per file basis and gives us a useful metric for how well our code has been tested. It's not realistic that you will always have 100% coverage or that 100% coverage will prevent all bugs, so there are diminishing returns if you try to overly maximize your coverage. It's essential to test your code, but you don't have to go overboard with coverage.

### Additional Resources

[https://www.theodo.fr/blog/2017/04/enzyme-fast-and-simple-react-testing/](https://www.theodo.fr/blog/2017/04/enzyme-fast-and-simple-react-testing/)

### Exercise

Complete the [Todo testing Exericse](https://github.com/rithmschool/react_curriculum_exercises/blob/master/Unit-01/02-testing)

#### [⇐ Previous](./01-intermediate_react.md) | [Table of Contents](./../readme.md) | [Next ⇒](./03-react_router.md)
