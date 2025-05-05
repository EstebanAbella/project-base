import axios, { AxiosInstance } from "axios"
import { CustomErrorType } from "../interface/global"

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

const envVars = {
  apiUrl: process.env.NEXT_PUBLIC_API_URI,
}

export const appVersionTest = process.env.APP_VERSION

class ApiService {
  axios: AxiosInstance
  token?: string

  constructor() {
    if ((global as globalType).apiInstance) {
      throw new Error("ApiService instance cannot be created!!")
    } else {
      this.axios = axios.create({
        baseURL: envVars.apiUrl,
        timeout: 50000,
        timeoutErrorMessage: "Tiempo de respuesta excedido",
        headers: {
          "Content-Type": "application/json",
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
      if (error.code === "ECONNABORTED") {
        return { statusCode: 501, statusMessage: error.message }
      } else {
        const statusCode = error.response?.status ? error.response.status : null
        const statusMessage = error.response?.data.error
          ? error.response?.data.error
          : "Generic Error"
        if (statusCode) return { statusCode, statusMessage }
        return { statusCode: 501, statusMessage }
      }
    } catch (e: unknown) {
      return { statusCode: 501, statusMessage: "Generic Error" }
    }
  }

  setToken(token: string): void {
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`
    this.token = token
  }
}

let ApiServiceSingleton
if (!(global as globalType).apiInstance) ApiServiceSingleton = new ApiService()
else ApiServiceSingleton = (global as globalType).apiInstance
export default ApiServiceSingleton as ApiService
