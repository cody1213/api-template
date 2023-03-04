# API Template

An API template for different databases

## Consuming Data

The following steps detail how to connect to the API and also what endpoints are currently available. There are also example Node and Python scripts in the [/tools/ folder](tools/) that demonstrate how to connect to the API.

### Acquire a key
In order to access the API, you must have a user account and an API key. Once you have those, you can send a request to the authentication endpoint to receive a token like so:

    curl -H "X-User: [YOUR EMAIL]" -H "X-Key: [YOUR KEY]" http://localhost:3000/auth/authenticate

Basically, you send an X-User and X-Key information via header. You can use GET or POST. 

If your credentials are correct, you should receive a token allowing access to data endpoints. During the development phase, tokens do not expire but they may in production.

### Make a data request
Once you've acquired a token, you can access data endpoints like so:

    curl -H "authorization: Bearer [YOUR TOKEN HERE]" "http://localhost:3000/users"

The token should be sent in the header as a "Bearer" token. You can send request information as standard GET variables. 

Data will be returned as JSON.

## Development Documentation

In order to run the DAISI API locally, you should have the most recent LTS release of NodeJS installed and credentials for the various databases.

### Install dependencies

```
npm install
```

### Create env file(s)

You must create a file called `.env.development` with various credentials. (Alternatively, you can create actual enviornment variables.) It should look like this:

```
# basics
NODE_ENV=development
PORT=3000
# Mongo info. Base is the connection string without a database or retryWrites or anything like that
MONGODB=
MONGODB_BASE=
MONGODB_DB=daisi-dev
MONGODB_USER=
MONGODB_PASS=
MONGODB_HOST=cluster0.cfx2sd7.mongodb.net
# MySQL info
MYSQL_HOST=localhost
MYSQL_USER=
MYSQL_PASS=
MYSQL_DB=

```

### Running in development

```
npm run dev
```

### Running in production

```
npm start
```

Runs on localhost:3000 by default but can be configured using the `PORT` environment variable.

### Running tests

```
npm test

# Watch repo
npm run test:watch
```

### Linting
```
npm run lint

# fix issues
npm run lint:fix
```
### Troubleshooting
If you're developing locally and you get a 403 error when attempting to run a Databricks query, it's likely due to a misconfigured (or not configred) ODBC connection. 

