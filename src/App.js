import React from 'react';
import Router from "./routers";
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './globalStyles'
import client from './apolloClient'
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </ApolloProvider>
    )
}

export default App;
