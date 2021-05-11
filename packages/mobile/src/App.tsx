import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import config from '~/config'
import Navigator from '~/navigation/Navigator'

const App = () => {
  const client = new ApolloClient({
    uri: config.apiBaseUrl,
    cache: new InMemoryCache(),
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
