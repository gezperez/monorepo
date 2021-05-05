import { action, makeAutoObservable, observable } from 'mobx'

export class AuthStore {
  @observable username: string | undefined

  @observable accessToken: string | undefined

  @observable refreshToken: string | undefined

  loading = false

  sessionHasExpired = false

  constructor(
    username: string,
    accessToken: string,
    refreshToken: string,
    loading: boolean,
    sessionHasExpired: boolean
  ) {
    this.username = username
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.loading = loading
    this.sessionHasExpired = sessionHasExpired

    makeAutoObservable(this, {
      signIn: action,
    })
  }

  signIn(): void {
    this.accessToken = undefined
    this.loading = true
  }
}
