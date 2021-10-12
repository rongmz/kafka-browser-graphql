require('dotenv').config()

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql')
const fs = require('fs')
const schemaResolvers = require('./schemaResolvers')
const { dataPath } = require('./kafka')

const app = express();
const PORT = 4000

// load the schema file
const SCHEMA_PATH = process.env.SCHEMA_PATH || (__dirname + '/schema.graphql')
console.log(`Loading graphql schema file. ${SCHEMA_PATH}`)
const schemaText = fs.readFileSync(SCHEMA_PATH, 'utf-8').toString()

console.log('Graphql schema loaded. Trying to build schema.')
const schema = buildSchema(schemaText)
console.log('Schema built.')

console.log(`Checking the data path is accssible ${dataPath}`)
fs.mkdirSync(dataPath, { recursive: true })
fs.accessSync(dataPath, fs.constants.R_OK | fs.constants.W_OK)
console.log(`Data path is accssible.`)

app.use('/d', express.static(dataPath))

app.use('/', graphqlHTTP({
  schema,
  rootValue: schemaResolvers,
  graphiql: true,
}));

app.listen(PORT);

console.log(`Running a GraphQL API server at http://localhost:${PORT}/`);
