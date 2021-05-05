import React from 'react'
import { View } from 'react-native'

import api from '~/api'
import config from '~/config'

const App = () => {
  const handleRefreshSessionFail = async () => {
    if (authStore.sessionHasExpired) {
      return
    }

    authStore.setSessionAsExpired()

    try {
      await authStore.logout()
    } catch (err) {
      // TODO: Log error
    }
  }

  const authRefreshInterceptor = async (failedRequest: any) => {
    try {
      await authStore.refreshSession(failedRequest)
    } catch (err) {
      handleRefreshSessionFail()
    }
  }

  api.init({
    baseUrl: config.apiBaseUrl,
    authRefreshInterceptor,
  })

  return <View />
}

export default App
