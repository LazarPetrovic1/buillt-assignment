# Buillt-app

In order to start the app initially, the preparation must be completed on the server-side.

## BE Installation

The server is written in [`NestJS`](https://nestjs.com/), with `PostgreSQL` as the database and [`MikroORM`](https://mikro-orm.io/) as the relational mapper.

*I couldn't figure out a way to insert PHP into the server, given that this is my main stack. My sincerest apologies...*

Instructions

1. Create a database and name it as in `server/src/mikro-orm.config.ts` ["dbName"] ("builtt" is the current hard-coded value)
1. `cd` into `server`
1. Install the dependencies with `npm i`
1. Initialize and run the initial migration to set up the tables in the db. The current commands for that are `npm run migrate:init` and `npm run migrate:run` respectively.
1. Run the commands to seed the user and the items, which will later be available in the app. The commands for those are `npm run seed:users` and `npm run seed:items` respectively.
1. Initialize the BE with `npm run start:dev`

## FE Installation

The client was made with [React](https://react.dev/) - [TypeScript](https://www.typescriptlang.org/)

1. `cd` into `client`
1. Install the dependencies with `npm i`
1. Start the app with `npm start`


### Bonus tasks

- Suggest possible improvements (functional or aesthetic).
  + Additional locale (e.g. English)
  + I converted the cart icon in the navbar into a dropdown with all routes (login & logout are conditional based on user's auth)
  + Also added the navigation on `/login` route. The "Prijavi se za brže plaćanje" on the `/cart` route was the reason for that
- Mobile responsive version is a plus.
  + I used [material-ui](https://mui.com/) during development, so the app is partially responsive, but there really wasn't much time for that

#### Q&A

+ What kind of projects are you interested in?

> Working on applications where a lot of different information interacts with one another (such as social media applications and SaaS projects, CAD projects for dispatch workers, etc.). Mostly interested in JS & TS projects with Python as well. 

+ What is your notice period (or when are you available to start working)?

> Available to start immediately - the notice period is over.

+ What is your salary expectation (you can put a range, not one amount)?

> Between €1800 & €2200 per month as net.