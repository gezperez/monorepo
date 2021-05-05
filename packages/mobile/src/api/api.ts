import Config from 'react-native-config'
import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { isNil } from 'lodash'

import { HttpHeader } from '~/enums/HttpHeader'

const init = ({ authRefreshInterceptor }: any) => {
  axios.defaults.baseURL = Config.BASE_URL
  axios.defaults.timeout = 60000

  createAuthRefreshInterceptor(axios, authRefreshInterceptor)

  axios.interceptors.request.use(request => {
    return request
  })
}

const setAuthToken = (token: string) => {
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
