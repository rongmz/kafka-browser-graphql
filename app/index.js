require('dotenv').config()

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql')
const fs = require('fs')
const schemaResolvers = require('./schemaResolvers')

const app = express();

// load the schema file
const SCHEMA_PATH = process.env.SCHEMA_PATH || (__dirname + '/schema.graphql')
console.log(`Loading graphql schema file. ${SCHEMA_PATH}`)
const schemaText = fs.readFileSync(SCHEMA_PATH, 'utf-8').toString()

console.log('Graphql schema loaded. Trying to build schema.')
const schema = buildSchema(schemaText)
console.log('Schema built.')


app.use('/', graphqlHTTP({
  schema,
  rootValue: schemaResolvers,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/');
