import { loggedUser } from "../interface/authModel.interface"

export interface globalType {
  localDataService?: LocalDataService
}

const varNames = {
  token: "token",
  userId: "userId",
  user: "user",
}

class LocalDataService {
  constructor() {
    if ((global as globalType).localDataService) {
      throw new Error("New instance cannot be created!!")
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

  saveUser(user: loggedUser): void {
    return this.set(varNames.user, JSON.stringify(user))
  }

  saveUserId(userId: string): void {
    return this.set(varNames.userId, userId)
  }

  saveToken(token: string): void {
    return this.set(varNames.token, token)
  }

  getUser(): loggedUser | null {
    const data = localStorage.getItem(varNames.user)
    if (!data) return null
    try {
      return JSON.parse(data) as loggedUser
    } catch (error) {
      console.error("Error parsing user from localStorage:", error)
      return null
    }
  }

  getUserId(): string {
    return this.get(varNames.userId)
  }

  getToken(): string {
    return this.get(varNames.token)
  }

  getVersion(): string {
    return "0.1.2"
  }

  clearData(): void {
    Object.entries(varNames).forEach((k) => {
      this.set(k[1], "")
    })
  }

  private removeLocalStorage() {
    if (typeof window !== "undefined") {
      window.localStorage.clear()
    }
  }

  public removeAllLocalStorage(): void {
    this.removeLocalStorage()
  }
}

let localDataServiceSingleton
if (!(global as globalType).localDataService)
  localDataServiceSingleton = new LocalDataService()
else localDataServiceSingleton = (global as globalType).localDataService
export default localDataServiceSingleton as LocalDataService
