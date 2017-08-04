# OmniChat

OmniChat is a chatroom-based organizational application. It's main features include creating chatrooms with messaging and audio/video communication. Another main feature is its capability of adding group-specific events that all members of a group can view.

## Team

- Dylan Gould
- Gideon Baik
- Peter Tan
- Shi-Hao Hong

## Roadmap

The project roadmap contains the main features and goals that we planned to and have implemented as we worked on this project. Please view the project roadmap [here](https://docs.google.com/document/d/1yGF5G8IW_wUWLtsoPsByz7-ROYsVnniga2lB3uEiGNo/edit?usp=sharing)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines. This contains general and more specific information regarding workflow for all contributors to this codebase.

# Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [Installing Dependencies](#installing-dependencies)
5. [Tasks](#tasks)

## Usage

$ yarn install
$ yarn build
$ yarn start
$ redis-server ## NOTE: Please search for your own OS-specific methods of running Redis. Redis is required in order for this application to work.

## Requirements

- Node 6.9.x
- Redis 2.7.x
- Postgresql 9.6.x

### Installing System Dependencies

```
brew install yarn
brew install redis
brew install postgresql
```

Yarn is a replacement for npm. It's faster and *guarantees* consistency -- as you deploy your code in various environments, you won't run the risk of slight variations in what gets installed.

### Install Project Dependencies

```
yarn global add knex eslint
```

## App Configuration

Override settings `config/knex.json` and `config/passport.json` in any environment by making a copy of `config/knex.example.json` and `config/passport.example.json` and naming it `config/knex.json` and `config/passport.json` and setting the appropriate variable. 

See https://www.npmjs.com/package/config
And https://github.com/lorenwest/node-config/wiki/Environment-Variables#custom-environment-variables

## Database Initialization

IMPORTANT: ensure `postgres` is running before performing these steps.



### Database Creation:

Use grunt to create a new database for your development and test environments:

Development environment: `grunt pgcreatedb:default`

Other environments, specify like so: `NODE_ENV=test grunt pgcreatedb:default`

### Run Migrations & Data Seeds

In terminal, from the root directory:

To migrate to the latest version, run:

`knex migrate:latest --env NODE_ENV`

To rollback a version, run:

`knex migrate:rollback --env NODE_ENV`

To populate the database with seed data, run:

`knex seed:run --env NODE_ENV`

Note: `--env NODE_ENV` may be omitted for development. For example, `knex migrate:latest` will run all migrations in the development environment, while `knex migrate:latest --env test` will migrate in the test environment.

## Running the App

To run webpack build: `yarn run build`

To run server: `yarn run start`

To run tests: 
1. Client-side tests:`yarn run client-test`
2. Server-side tests:`yarn run server-test`

To run your redis server for the session store `redis-server`