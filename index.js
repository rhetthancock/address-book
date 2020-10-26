const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const port = 4000;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.listen(port, () => {
    console.log(`Running GraphQL API server at http://localhost:${port}/graphql`);
});