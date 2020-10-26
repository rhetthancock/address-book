const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'AffectedRows',
    description: 'Number of rows affected by query',
    fields: {
        affectedRows: { type: new GraphQLNonNull(GraphQLInt) },
    },
});