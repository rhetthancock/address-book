const {
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
} = require('graphql');
const type = require('./type');
const Person = require('./person');

module.exports = {
    person: {
        type,
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve: Person.getByID.bind(Person),
    },
    persons: {
        type: new GraphQLList(type),
        resolve: Person.findMatching.bind(Person),
    }
}