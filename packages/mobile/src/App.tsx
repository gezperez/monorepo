import React, { useEffect } from 'react'
import { Platform } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import api from '~/api'
import config from '~/config'
import Navigator from '~/navigation/Navigator'
import { useStore } from '~/store'
import { navigate } from './navigation/RootNavigator'

const App = () => {
  const { appStore, authStore } = useStore()

  const { version, deviceModel, maintenanceMode } = appStore

  const handleRefreshSessionFail = async () => {
    if (authStore.sessionHasExpired) {
      return
    }

    authStore.setSessionAsExpired()

    await authStore.signOut()
  }

  const handleServiceUnavailable = () => {
    if (maintenanceMode) {
      return
    }

    appStore.enableMaintenanceMode()

    navigate('Maintenance')
  }

  const authRefreshInterceptor = async (failedRequest: any) => {
    try {
      await authStore.refreshSession(failedRequest)
    } catch (err) {
      handleRefreshSessionFail()
    }
  }

  const handleMandatoryUpdateRequired = () => {
    appStore.setMandatoryUpdateAsRequired()
    navigate('Update')
  }

  api.init({
    baseUrl: config.apiBaseUrl,
    version,
    deviceModel,
    platform: Platform.OS,
    authRefreshInterceptor,
    onServiceUnavailable: handleServiceUnavailable,
    onMandatoryUpdateRequired: handleMandatoryUpdateRequired,
  })

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return <Navigator />
}

export default App
