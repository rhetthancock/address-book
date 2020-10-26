const { GraphQLObjectType } = require('graphql');
const personQueries = require('../model/person/queries');

module.exports = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Queries',
    fields: {
        person: personQueries.person,
        persons: personQueries.persons,
    },
});