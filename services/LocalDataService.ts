export interface globalType {
  localDataService?: LocalDataService
}

const varnames = {
  token: 'token',
  userId: 'userId',
}

class LocalDataService {
  constructor() {
    if ((global as globalType).localDataService) {
      throw new Error('New instance cannot be created!!')
    }
    ;(global as globalType).localDataService = this
  }

  getInstance(): this {
    return this
  }

  set(key: string, value: string): void {
    return window.localStorage.setItem(key, value)
  }

  get<T>(key: string): T {
    return window.localStorage.getItem(key) as T
  }

  saveUserId(userId: string): void {
    return this.set(varnames.userId, userId)
  }

  saveToken(token: string): void {
    return this.set(varnames.token, token)
  }

  getUserId(): string {
    return this.get(varnames.userId)
  }

  getToken(): string {
    return this.get(varnames.token)
  }

  getVersion(): string {
    return "0.1.2"
  }

  clearData(): void {
    Object.entries(varnames).forEach((k) => {
      this.set(k[1], '')
    })
  }
}

let localDataServiceSingleton
if (!(global as globalType).localDataService)
  localDataServiceSingleton = new LocalDataService()
else localDataServiceSingleton = (global as globalType).localDataService
export default localDataServiceSingleton as LocalDataService
