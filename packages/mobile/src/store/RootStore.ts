import { AuthStore } from './AuthStore'

export class RootStore {
  authStore

  constructor() {
    this.authStore = new AuthStore()
  }
}
