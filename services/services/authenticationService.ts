import { apiUrls } from "../../apiService/apiUrl"
import HttpServiceSingleton from "../../apiService/HttpService"
import LocalDataService from "../LocalDataService"
import ApiServiceSingleton from "../../apiService/ApiService"
import { loggedUser } from "../../interface/authModel.interface"

export class AuthService {
  constructor() {}

  async doLogin(email: string, password: string): Promise<loggedUser | void> {
    try {
      const body = { email, password }

      const { data, error } = await HttpServiceSingleton.post<
        { user: loggedUser },
        typeof body
      >(apiUrls.login, body)

      if (error) throw error

      const user = data!.user
      if (!user.token || !user.id) return
      ApiServiceSingleton.setToken(user.token)
      LocalDataService.getInstance().saveToken(user.token)
      LocalDataService.getInstance().saveUserId(user.id)
      LocalDataService.getInstance().saveUser(user)
      return user
    } catch (error) {
      throw error
    }
  }

  async doRestorePassword(data: {
    email: string
    location: string
    backoffice: boolean
  }): Promise<void> {
    try {
      const { error } = await HttpServiceSingleton.post<{}, typeof data>(
        apiUrls.doRestorePassword,
        data
      )

      if (error) throw error
    } catch (error) {
      throw error
    }
  }

  async doRestorePasswordValidated(data: {
    newPassword: string
    token: string
  }): Promise<void> {
    try {
      const { error } = await HttpServiceSingleton.post<{}, typeof data>(
        apiUrls.doRestorePasswordValidated,
        data
      )

      if (error) throw error
    } catch (error) {
      throw error
    }
  }

  async getUserByToken(token: string): Promise<loggedUser> {
    try {
      ApiServiceSingleton.setToken(token)

      const { data, error } = await HttpServiceSingleton.get<{
        user: loggedUser
      }>(`${apiUrls.userByToken}?token=${token}`)

      if (error) throw error
      return data!.user
    } catch (error) {
      throw error
    }
  }
}

export const authService = new AuthService()
