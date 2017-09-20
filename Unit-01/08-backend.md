#### [⇐ Previous](./07-testing_redux.md) | [Table of Contents](./../readme.md) | [Next ⇒](./09-react_redux_auth.md)

# Backend Concepts

## Objectives

By the end of this chapter, you should be able to:

- Understand the main architecture design patterns at a high-level
- Understand how frontend and backend apps work together
- Understand the basics of how frontend apps can be deployed

## Two different structures

### The Monolith

The most traditional system architecture pattern is the monolith, which means that the full stack of the app lives together. This pattern also lives on with MVC/templating engines (such as Flask or Rails), PHP apps with the LAMP stack, and other legacy apps still in use across the internet.

A variation of the Monolith is having the entire codebase travel in the same repository, but having isolated folders (`server` for the backend API). In this setup, the server might even be in a different language (Python for instance) than the JS/HTML/CSS frontend folders. While developing, you might start your backend dev server on one port (e.g. `localhost:5000`), and your Frontend dev server on another port(e.g. `localhost:8080`), and then the Frontend makes requests to the backend all over localhost.

The advantages of monoliths include:

- fast development
- easy deployment
- easy testing

The disadvantages include:

- bulk/complexity
- reliability (Frontend goes down, backend goes down)
- slow/cumbersome to push changes and new deployments (you have to redeploy the backend even to just to change the Frontend)

### Service Oriented Architecture / Microservices

In recent years, service oriented architecture (SOA) and microservices have become more popular. In a service oriented architecture, there exist many backend services (APIs, scripts, databases, etc.) that are decoupled from each other. Microservices can be thought of as a subset of SOA which involves services being as decoupled as possible and also as small as possible (trying to have each service do one main thing).

Developing against microservices usually involves the frontend making network requests over the internet to a development or QA environment. Often, microservices live behind an API Gateway which is a centralized point of access for the services. However, depending on how many services there are, sometimes you can run a handful of containers locally and have the frontend connect over localhost as above.

The advantages of SOA/microservices include:

- teams can specialize on one service (great for large companies)
- maintenance and deployment becomes more straightforward (Frontend doesn't care if any other service gets replaced)
- reliability (Frontend can still be up even if a few backend services are down)

The disadvantages include:

- more complex (adds engineering planning time up front)
- testing the whole system is hard (since the services don't know about the other services)
- expensive (there are usually many more servers running; scaling them all up can be costly)

### Which Architecture is Better?

As always, it depends. You will find many startups using monoliths (largely due to the popularity of Rails) because it's fast to get an MVP out there, while most mature companies / corporate conglomerates have SOAs due to the vast complexity of their enterprise systems. However, there is no clear best practice and exceptions exist for both.

## The Backend for React/Redux

Frontend apps with React/Redux will need to have different configurations of which services to connect to and keys to use. You should store this information in environment variables. For instance, webpack is set up to pass environment variables via the `.env` files (if you're using `create-react-app`, more about that [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables)).

Your API endpoint requests should dynamically change based on environment. For example, if you're developing and want to connect to backend development services (instead of backend production services) you might query against `api-dev.mygateway.com` instead of `api.mygateway.com`.

### Deploying React/Redux

When developing locally, you most likely use webpack's development server to serve your content on `localhost`. However, when ready for deployment there are two main options:

#### Build static assets and upload them to a server

This is the most common method of deployment. You do `npm run build` to trigger a custom webpack build (which also bakes in environment variables) to get you a chunk of production-ready static assets (minified JavaScript, HTML, CSS, etc.) that you can then upload to a server such as Amazon's S3 web server. S3 just puts a light proxy server in front of your files and serves them up complete with load balancing, etc.

#### Server-Side Rendering (SSR)

Another option is to run your own server that can pre-render certain assets and handle the initial renders of the site. This is a complex topic but you can read more [here](http://redux.js.org/docs/recipes/ServerRendering.html) and [here](http://andrewhfarmer.com/server-side-render/).

## Additional Resources

[Great explanation of Microservices](https://smartbear.com/learn/api-design/what-are-microservices/)

[Comparison of Microservices vs. Monolith](https://articles.microservices.com/monolithic-vs-microservices-architecture-5c4848858f59)

[Another Comparison of Microservices with a Whitepaper](https://www.mulesoft.com/resources/api/microservices-vs-monolithic)

[Server Side Rendering with Create React App](https://medium.com/@benlu/ssr-with-create-react-app-v2-1b8b520681d9)

#### [⇐ Previous](./07-testing_redux.md) | [Table of Contents](./../readme.md) | [Next ⇒](./09-react_redux_auth.md)
