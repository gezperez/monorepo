import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { get, isFunction, isNil } from 'lodash'

import { HttpHeader } from '~/enums/HttpHeader'

type Init = {
  baseUrl: string
  version: string
  deviceModel: string
  platform: string
  authRefreshInterceptor: (error: any) => Promise<any>
  onServiceUnavailable: () => void
  onMandatoryUpdateRequired: () => void
}

const init = ({
  baseUrl,
  version,
  deviceModel,
  platform,
  authRefreshInterceptor,
  onServiceUnavailable,
  onMandatoryUpdateRequired,
}: Init) => {
  axios.defaults.baseURL = baseUrl
  axios.defaults.timeout = 60000

  if (platform === 'ios') {
    axios.defaults.headers.common[HttpHeader.X_IOS_APP_VERSION] = version
  }

  if (platform === 'android') {
    axios.defaults.headers.common[HttpHeader.X_ANDROID_APP_VERSION] = version
  }

  axios.defaults.headers.common[HttpHeader.MODEL] = deviceModel

  createAuthRefreshInterceptor(axios, authRefreshInterceptor)

  axios.interceptors.request.use(request => {
    return request
  })

  if (isFunction(onServiceUnavailable)) {
    axios.interceptors.response.use(undefined, error => {
      const statusCode = get(error, 'response.status')

      if (isMaintenanceModeError(error)) {
        onServiceUnavailable()
      } else if (statusCode !== 401) {
        // TODO: think what to do in this case
      }

      return Promise.reject(error)
    })
  }

  if (isFunction(onMandatoryUpdateRequired)) {
    axios.interceptors.response.use(undefined, error => {
      const statusCode = get(error, 'response.status')

      if (statusCode === 412) {
        onMandatoryUpdateRequired()
      }

      return Promise.reject(error)
    })
  }
}

const isMaintenanceModeError = (error: Error) => {
  const statusCode = get(error, 'response.status')
  const reason = get(error, 'response.data.reason')

  return statusCode === 503 && reason === 'MAINTENANCE_MODE'
}

const setAuthToken = (token: string | undefined) => {
  if (!isNil(token)) {
    axios.defaults.headers.common[HttpHeader.AUTHORIZATION] = `Bearer ${token}`
  }
}

const unsetAuthToken = () => {
  delete axios.defaults.headers.common.authorization
}

const isAuthenticated = () => !!axios.defaults.headers.common.authorization

export default {
  init,
  setAuthToken,
  unsetAuthToken,
  isAuthenticated,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
}
