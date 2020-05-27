import ApolloClient from 'apollo-boost'

require('dotenv').config()

const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'cache-and-network',
    }
};

const client = new ApolloClient({
    fetchOptions: defaultOptions,
    uri: process.env.REACT_APP_SERVER_ADDRESS
})

export default client;