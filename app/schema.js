const { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, } = require('graphql')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve(parentValue, args, request) {
          return 'world';
        },
      },
    },
  }),
});