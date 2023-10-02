import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ApolloProvider} from '@apollo/react-hooks';
import {apollo} from './apollo';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={apollo}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </ApolloProvider>
)
