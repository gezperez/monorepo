import { RefreshSessionResponse, SignInReponse } from '~/interfaces/auth'
import api from './api'

const signIn = (email: string, password: string) => api.post<SignInReponse>('/auth/sign-in', { email, password })

const refreshSession = (refreshToken: string | undefined) =>
  api.post<RefreshSessionResponse>('/auth/refresh', { refreshToken })

const signOut = (refreshToken: string | undefined) => api.post('/auth/sign-out', { refreshToken })

export default {
  signIn,
  signOut,
  refreshSession,
}
