import { action, makeAutoObservable, observable } from 'mobx'

export class AuthStore {
  @observable username: string | undefined

  @observable accessToken: string | undefined

  @observable refreshToken: string | undefined

  loading = false

  sessionHasExpired = false

  constructor() {
    makeAutoObservable(this, {
      signIn: action,
    })
  }

  signIn(): void {
    this.accessToken = 'prueba'
    this.loading = true
  }
}
