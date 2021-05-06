import React from 'react'

import api from '~/api'
import config from '~/config'
import Navigator from '~/navigation/Navigator'
import { useStore } from '~/store'

const App = () => {
  const { authStore } = useStore()

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

  return <Navigator />
}

export default App
