#### [⇐ Previous](./07-testing_redux.md) | [Table of Contents](./../readme.md) | [Next ⇒](./09-react_redux_auth.md)

# Setting up the Back End

## Objectives

By the end of this chapter, you should be able to:

- Understand how Back End and Front End apps work together
- Understand some architecture design structures at a high-level
- Connect client-side routing with an API

## Two different structures

### The Monolith

The most traditional system architecture pattern is the monolith, which means that the full stack of the app lives together. In the old days of LAMP stack (php) and before, monoliths  took the form of the entire application code being a single app. This pattern also lives on with MVC/templating engines (such as Flask or Rails) and legacy apps still in use across the internet.

A variation of the Monolith is having the entire codebase travel in the same repository, but having isolated folders (`server` for the Back End API). In this setup, you might start your Back End dev server on one port (e.g. `localhost:5000`), and your Front End dev server on another port(e.g. `localhost:8080`), and then the Front End makes requests to the Back End all over localhost.

The advantages of monoliths include: fast development, easy deployment, and easy testing.
The disadvantages include: bulk/complexity, reliability (Front End goes down, Back End goes down), and slow/cumbersome deployments (you have to redeploy the Back End even to just to change the Front End).

### Service Oriented Architecture / Microservices

In recent years, service oriented architecture / microservices have become more popular. In a service oriented architecture, there are many Back End APIs that are decoupled from each other. Microservices is a subset of SOA which involves services being as decoupled as possible and also as small as possible (trying to have each service do one main thing).

The advantages of SOA/microservices include: teams can specialize on one service (great for large companies), maintenance and deployment becomes more straightforward (Front End doesn't care if any other service gets replaced), reliability (Front End can still be up even if a few Back End services are down).

The disadvantages include: complex (adds engineering planning time up front), testing the whole system is hard (since the services don't know about the other services), redundancy/cost(imagine updating Node.js on 15 different services).

### Which Architecture is Better?

As always, it depends. You will find many startups using monoliths (read: Rails) because it's fast to get an MVP out there, while most mature companies / corporate conglomerates have SOAs due to the vast complexity of their enterprises. However, there is no clear best practice and it depends on the situation.

## Additional Resources

[Great explanation of microservices](https://smartbear.com/learn/api-design/what-are-microservices/)

[Comparison of Microservices vs. Monolith](https://articles.microservices.com/monolithic-vs-microservices-architecture-5c4848858f59)

[Another Comparison with a whitepaper](https://www.mulesoft.com/resources/api/microservices-vs-monolithic)

## Exercise

#### [⇐ Previous](./07-testing_redux.md) | [Table of Contents](./../readme.md) | [Next ⇒](./09-react_redux_auth.md)
