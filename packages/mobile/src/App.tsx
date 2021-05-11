import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { ApolloClient, ApolloProvider, createHttpLink, DefaultOptions, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import config from '~/config'
import Navigator from '~/navigation/Navigator'

const App = () => {
  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }

  const httpLink = createHttpLink({
    uri: config.apiBaseUrl,
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions,
  })

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <ApolloProvider client={client}>
      <Navigator />
    </ApolloProvider>
  )
}

export default App
