const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInt
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Person',
    description: 'An individual in the address book',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: {type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        role: { type: new GraphQLNonNull(GraphQLString) },
    },
});