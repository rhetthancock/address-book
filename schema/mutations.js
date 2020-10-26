const { GraphQLObjectType } = require('graphql');
const personMutation = require('../model/person/mutations');

module.exports = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutations',
    fields: {
        createPerson: personMutation.createPerson,
        updatePerson: personMutation.updatePerson,
        deletePerson: personMutation.deletePerson,
    },
});