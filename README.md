# Introduction

This is a project where a user provide basic informations in a flow and in the end it is presented a Github profile page.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

Open the local server at [http://localhost:8080/](http://localhost:8080/)

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
npm run test:unit:watch
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Run all tests in one command

```
npm run test:ci
```

### Lints and fixes files

```
npm run lint
```

# Structure

I'm following the default vue-cli project structure, but some folders/files are worth mentioning:

- `./src/components`: All presentational components are here, the only exception is the `BasicInformationForm` that have access to the `$api` service
- `./src/directives`: All project directives are here
- `./src/env.js`: This file is used as a global env configuration file to be used instead of rely in `process.env`
- `./src/plugins`: This folder is used to register third party and global services in the application

# Gotchas

- I'm using the `plugins` folder as a central place to register third party and global application services
  - This folder is "inspired" in `Nuxt`, with a VERY simpler/manual implementation
  - The axios instance is extended to give support to extra methods like `$get/$post/$put` that automatically extracts the `data` response property
  - I have a `$api` service that is automatically injected in the `Vue` prototype, that way it can be accessed in all parts of the application
- I'm working with `VueI18n` and all the application have support to multiple idioms
- This project is using [testing-library](https://testing-library.com/) for unit/integration tests and [Cypress](https://www.cypress.io/) for E2E tests
  - Testing library is a awesome project with a clear principle:
    > The more your tests resemble the way your software is used, the more confidence they can give you.
