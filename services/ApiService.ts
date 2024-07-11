import axios, { AxiosInstance } from 'axios'
import { CustomErrorType, Paginator } from '../Utils/Types/global'
import { loggedUser } from '../Utils/Types/authModel'
import LocalDataService from './LocalDataService'
import { UserResult } from '../Utils/Types/userType'
import { SurveyResult } from '../Utils/Types/surveyType'

export interface globalType {
  apiInstance?: ApiService
}

export interface AuthUserType {
  accessToken: string
}

export interface ApiServiceError {
  code: string
  message: string
}

const apiUrls = {
  /* login */
  login: '/v1/auth/login',
  /* doRestorePassword */
  doRestorePassword: 'v1/users/createToken',
  /* doRestorePasswordValidated */
  doRestorePasswordValidated: 'v1/users/resetPassword',
  /*User by Token */
  userByToken: '/v1/auth/login',
  /* users */
  users: '/v1/users',
  /* survey */
  survey: '/v1/survey',
}

const envVars = {
  apiUrl: process.env.NEXT_PUBLIC_API_URI,
}

export const appVersionTest = process.env.APP_VERSION

class ApiService {
  axios: AxiosInstance
  token?: string

  constructor() {
    if ((global as globalType).apiInstance) {
      throw new Error('New instance cannot be created!!')
    } else {
      this.axios = axios.create({
        baseURL: envVars.apiUrl,
        timeout: 50000,
        timeoutErrorMessage: 'Tiempo de respuesta excedido',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
    ;(global as globalType).apiInstance = this
  }

  getInstance(): this {
    return this
  }

  errorComposer(error: any): CustomErrorType {
    try {
      if (error.code === 'ECONNABORTED') {
        return { statusCode: 501, statusMessage: error.message }
      } else {
        const statusCode = error.response?.status ? error.response.status : null
        const statusMessage = error.response?.data.error
          ? error.response?.data.error
          : 'Generic Error'
        if (statusCode) return { statusCode, statusMessage }
        return { statusCode: 501, statusMessage }
      }
    } catch (e: unknown) {
      return { statusCode: 501, statusMessage: 'Generic Error' }
    }
  }

  setToken(token: string): void {
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`
    this.token = token
  }

  async doLogin(
    email: string,
    password: string
  ): Promise<loggedUser | CustomErrorType> {
    return await new Promise<loggedUser>((resolve, reject) => {
      const body = { email, password }
      this.axios
        .post(apiUrls.login, body)
        .then((response) => {
          const user = response.data.user as loggedUser
          this.setToken(response.data.user.token)
          LocalDataService.getInstance().saveToken(response.data.user.token)
          LocalDataService.getInstance().saveUserId(response.data.user.id)
          resolve(user)
        })
        .catch((e) => {
          reject(this.errorComposer(e))
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
      this.axios
        .post(`${apiUrls.doRestorePassword}`, body)
        .then((response) => {
          resolve()
        })
        .catch((e) => {
          reject(this.errorComposer(e))
        })
    })
  }

  async doRestorePasswordValidated(data: {
    newPassword: string
    token: string
  }): Promise<any> {
    return await new Promise<void>((resolve, reject) => {
      const body = data
      this.axios
        .post(`${apiUrls.doRestorePasswordValidated}`, body)
        .then((response) => {
          resolve()
        })
        .catch((e) => {
          reject(this.errorComposer(e))
        })
    })
  }
  // Get user By Token
  async getUserByToken(token: string): Promise<loggedUser> {
    this.setToken(token)
    return await new Promise<loggedUser>((resolve, reject) => {
      this.axios
        .get(`${apiUrls.userByToken}?token=${token}`)
        .then((response) => {
          const user = response.data as loggedUser
          resolve(user)
        })
        .catch((e) => {
          reject(this.errorComposer(e))
        })
    })
  }

  //*****USER*****//
  async getUser(id: string): Promise<UserResult> {
    return await new Promise<UserResult>((resolve, reject) => {
      this.axios
        .get(`${apiUrls.users}/${id}`)
        .then((response) => {
          const user = response.data.user as UserResult
          resolve(user)
        })
        .catch((e) => {
          reject(this.errorComposer(e))
        })
    })
  }
  async getUsers(
    offset?: number,
    limit?: number,
    query?: string,
    filter?: string,
    order?: string,
    roles?: string
  ): Promise<UserResult[]> {
    return await new Promise<UserResult[]>((resolve, reject) => {
      const params = {
        offset,
        limit,
        q: query,
        searchIn: filter,
        sort: order,
        roles,
      }
      if (!params.q) delete params.q
      if (params.searchIn === 'id') delete params.searchIn

      this.axios
        .get(`${apiUrls.users}`, { params })
        .then((response) => {
          const formatedItems = response.data.users.map((u: UserResult) => {
            return {
              ...u,
            }
          })
          resolve(formatedItems)
        })
        .catch((e) => {
          reject(this.errorComposer(e))
        })
    })
  }
  async createUser(submittedData: { [key: string]: string }): Promise<{}> {
    return await new Promise<{}>((resolve, reject) => {
      this.axios
        .post(`${apiUrls.users}`, submittedData)
        .then((response) => {
          const user = response.data as UserResult
          resolve(user)
        })
        .catch((e) => {
          reject(this.errorComposer(e))
        })
    })
  }

  async deleteUser(id: string): Promise<{}> {
    return await new Promise<{}>((resolve, reject) => {
      this.axios
        .delete(`${apiUrls.users}/${id}`)
        .then((response) => {
          const user = response.data as UserResult
          resolve(user)
        })
        .catch((e) => {
          reject(this.errorComposer(e))
        })
    })
  }
  async editUser(submittedData: any): Promise<{}> {
    const { name, id, email, role, password } = submittedData
    const newData = {
      name,
      id,
      email,
      role,
      password,
    }
    return await new Promise<{}>((resolve, reject) => {
      if (!submittedData.id) reject(new Error('invalidId'))
      else {
        this.axios
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          .put(`${apiUrls.users}/${submittedData.id}`, submittedData)
          .then((response) => {
            const user = response.data as UserResult
            resolve(user)
          })
          .catch((e) => {
            reject(this.errorComposer(e))
          })
      }
    })
  }

  //*****SURVEY*****//
  async getSurvey(id: number): Promise<SurveyResult> {
    return await new Promise<SurveyResult>((resolve, reject) => {
      this.axios
        .get(`${apiUrls.survey}/${id}`)
        .then((response) => {
          const survey = response.data as SurveyResult
          resolve(survey)
        })
        .catch((e) => {
          reject(this.errorComposer(e))
        })
    })
  }
  async getSurveys(
    offset?: number,
    limit?: number,
    query?: string,
    filter?: string,
    order?: string,
    roles?: string
  ): Promise<Paginator<SurveyResult>> {
    return await new Promise<Paginator<SurveyResult>>((resolve, reject) => {
      const params = {
        offset,
        limit,
        q: query,
        searchIn: filter,
        sort: order,
        roles,
      }
      if (!params.q) delete params.q
      if (params.searchIn === 'id') delete params.searchIn

      this.axios
        .get(`${apiUrls.survey}`, { params })
        .then((response) => {
          const surveys = response.data as Paginator<SurveyResult>
          resolve(surveys)
        })
        .catch((e) => {
          reject(this.errorComposer(e))
        })
    })
  }
}

let ApiServiceSingleton
if (!(global as globalType).apiInstance) ApiServiceSingleton = new ApiService()
else ApiServiceSingleton = (global as globalType).apiInstance
export default ApiServiceSingleton as ApiService
