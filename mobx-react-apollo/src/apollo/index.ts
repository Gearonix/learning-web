import {ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createUploadLink({
        uri: 'http://localhost:6868/graphql'
})

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:6868/graphql',
}));

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

export const apollo = new ApolloClient({
    // uri: 'http://localhost:6868/graphql',
    cache: new InMemoryCache(),
    link: splitLink,
    uri: 'http://localhost:6868/graphql',
})
