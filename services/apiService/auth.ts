import { CustomErrorType } from "../../interface/global"
import LocalDataService from "../LocalDataService"
import ApiServiceSingleton from "../../api/ApiService"
import { loggedUser } from "../../models/models"

export interface globalType {
  AuthService?: AuthService
}

const apiUrls = {
  /* login */
  login: "/v1/auth/login",
  /* doRestorePassword */
  doRestorePassword: "v1/users/createToken",
  /* doRestorePasswordValidated */
  doRestorePasswordValidated: "v1/users/resetPassword",
  /*User by Token */
  userByToken: "/v1/auth/login",
}

class AuthService {
  constructor() {
    if ((global as globalType).AuthService) {
      throw new Error("AuthService instance already exists!")
    }
    ;(global as globalType).AuthService = this
  }

  getInstance(): this {
    return this
  }

  async doLogin(
    email: string,
    password: string
  ): Promise<loggedUser | CustomErrorType> {
    return await new Promise<loggedUser>((resolve, reject) => {
      const body = { email, password }
      ApiServiceSingleton.axios
        .post(apiUrls.login, body)
        .then((response) => {
          const user = response.data.user as loggedUser
          ApiServiceSingleton.setToken(response.data.user.token)
          LocalDataService.getInstance().saveToken(response.data.user.token)
          LocalDataService.getInstance().saveUserId(response.data.user.id)
          resolve(user)
        })
        .catch((e) => {
          reject(ApiServiceSingleton.errorComposer(e))
        })
    })
  }

  // RESTORE PASSWORD
  async doRestorePassword(data: {
    email: string
    location: string
    backoffice: boolean
  }): Promise<any> {
    return await new Promise<void>((resolve, reject) => {
      const body = data
      ApiServiceSingleton.axios
        .post(`${apiUrls.doRestorePassword}`, body)
        .then((response) => {
          resolve()
        })
        .catch((e) => {
          reject(ApiServiceSingleton.errorComposer(e))
        })
    })
  }

  async doRestorePasswordValidated(data: {
    newPassword: string
    token: string
  }): Promise<any> {
    return await new Promise<void>((resolve, reject) => {
      const body = data
      ApiServiceSingleton.axios
        .post(`${apiUrls.doRestorePasswordValidated}`, body)
        .then((response) => {
          resolve()
        })
        .catch((e) => {
          reject(ApiServiceSingleton.errorComposer(e))
        })
    })
  }
  // Get user By Token
  async getUserByToken(token: string): Promise<loggedUser> {
    ApiServiceSingleton.setToken(token)
    return await new Promise<loggedUser>((resolve, reject) => {
      ApiServiceSingleton.axios
        .get(`${apiUrls.userByToken}?token=${token}`)
        .then((response) => {
          const user = response.data.user as loggedUser
          resolve(user)
        })
        .catch((e) => {
          reject(ApiServiceSingleton.errorComposer(e))
        })
    })
  }
}

let AuthServiceSingleton
if (!(global as globalType).AuthService)
  AuthServiceSingleton = new AuthService()
else AuthServiceSingleton = (global as globalType).AuthService
export default AuthServiceSingleton as AuthService
