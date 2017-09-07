#### [⇐ Previous](./06-testing.md) | [Table of Contents](./../readme.md) | [Next ⇒](./08-react_redux_auth.md)

# Backend with React

### Objectives

By the end of this chapter, you should be able to:

- Build an API that a react front-end can consume
- Connect client side routing with an API 

### Two different structures

When building full stack applications we can structure our apps two different ways. We can either completely isolate our client and server (make them separate apps, make the backend a standalone API) or we can combine them into one app. The advantages of isolating each part of the application is that if one part changes (move the front-end to angular / move the backend to ruby), it is much easier to change and if another application wants to consume the API, the front-end is not as tightly coupled to the backend. 

The other option is to make everything one large application and have the server first respond with a route that kicks off the `react-router`. This is a viable option, but the first option allows for more flexibility and less coupling. This means we need to think how to isolate our applications completely. All of our client-side code will go in one folder and that application will be started with the `webpack-dev-server` and our server-side code will live in another folder and be started with `python app.py`. Our backend will respond with JSON for almost all requests.

### Exercise

#### [⇐ Previous](./06-testing.md) | [Table of Contents](./../readme.md) | [Next ⇒](./08-react_redux_auth.md)
