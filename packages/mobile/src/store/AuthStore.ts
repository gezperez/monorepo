import { isNil } from 'lodash'
import { observable, runInAction } from 'mobx'

import api from '~/api'
import { HttpHeader } from '~/enums/HttpHeader'

export class AuthStore {
  @observable username: string | undefined

  @observable accessToken: string | undefined

  @observable refreshToken: string | undefined

  @observable loading = false

  @observable sessionHasExpired = false

  get isAuthenticated() {
    return !isNil(this.accessToken)
  }

  signIn(): void {
    this.accessToken = 'prueba'
    this.loading = true
  }

  setSessionAsExpired() {
    this.sessionHasExpired = true
  }

  async refreshSession(failedRequest: any): Promise<any> {
    const refreshSessionResponse = await api.auth.refreshSession(this.refreshToken)

    const {
      data: { refreshToken, accessToken },
    } = refreshSessionResponse

    runInAction(() => {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
    })

    api.setAuthToken(this.accessToken)

    // eslint-disable-next-line no-param-reassign
    failedRequest.response.config.headers[HttpHeader.AUTHORIZATION] = `Bearer ${this.accessToken}`
  }

  async signOut(): Promise<any> {
    if (this.isAuthenticated) {
      await api.auth.signOut(this.refreshToken)
    }

    runInAction(() => {
      this.accessToken = undefined
      this.refreshToken = undefined
    })

    api.unsetAuthToken()
  }
}
