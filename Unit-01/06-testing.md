#### [⇐ Previous](./05-redux_and_react.md) | [Table of Contents](./../readme.md) | [Next ⇒](./07-backend.md)

# Testing

### Objectives

By the end of this chapter, you should be able to:

- Use `jest` to test components
- Test redux actions and reducers

### Getting Started

Let's first start by creating a folder for our application, we will call it `react_testing`

### Challenges with Testing UI

One of the biggest challenges around testing UI is that your UI will so frequently change. This means that tests can become obsolete quickly and will need to be re-written quite often. It is useful to understand how to test UIs with React, but it is also important to understand just how often your code is going to change. 

This does not mean that all UI code should not be tested. If you are working wiht data that will be put into your UI - that should absolutely be tested, but if you are only testing certain markup on a page, that can become obsolete quite quickly.

#### [⇐ Previous](./05-redux_and_react.md) | [Table of Contents](./../readme.md) | [Next ⇒](./07-backend.md)
w
