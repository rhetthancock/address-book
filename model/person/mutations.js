const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
} = require('graphql');
const personType = require('./type');
const affectedType = require('../affected/type');
const Person = require('./person');

module.exports = {
    createPerson: {
        type: personType,
        args: {
            firstName: {type: new GraphQLNonNull(GraphQLString) },
            lastName: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: GraphQLString },
            phone: { type: GraphQLString },
            role: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: Person.createEntry.bind(Person),
    },
    updatePerson: {
        type: personType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            firstName: { type: new GraphQLNonNull(GraphQLString) },
            lastName: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: GraphQLString },
            phone: { type: GraphQLString },
            role: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: Person.updateEntry.bind(Person),
    },
    deletePerson: {
        type: affectedType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve: Person.deleteEntry.bind(Person),
    }
}