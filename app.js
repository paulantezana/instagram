const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');

const path = require('path');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

// Database models
const models = require('./models');

// GraphQL Types and resolvers
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ 
    schema,
    context: {
        models
    }
}));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
mongoose.connect('mongodb://localhost/instagram')
    .then(db => console.log('DB Connected'))
    .catch(err => console.log(err));

app.listen(3000, () => {
    console.log('Go to http://localhost:3000/graphiql to run queries!');
});