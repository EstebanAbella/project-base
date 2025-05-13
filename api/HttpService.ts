import { AxiosRequestConfig, AxiosResponse } from "axios"
import ApiServiceSingleton from "./ApiService"
import NotificationService from "../services/NotificationService"

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface globalType {
  HttpService?: HttpService
}

class HttpService {
  constructor() {
    if ((global as globalType).HttpService) {
      throw new Error("HttpService instance already exists!")
    }
    ;(global as globalType).HttpService = this
  }

  getInstance(): this {
    return this
  }

  /**
   * GET data from a specified URL with optional parameters.
   *
   * @param {string} url - The URL to fetch data from.
   * @param {P} params - Optional parameters object to include in the request.
   * @return {Promise<ApiResponse<T>>} A promise containing the fetched data and any error that occurred.
   */
  async get<T, P = Record<string, never>>(
    url: string,
    params?: P
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await ApiServiceSingleton.axios.get<
        T,
        AxiosResponse<T>
      >(url, { ...(params ? { params } : {}) })
      return { data: response.data, error: null }
    } catch (error: any) {
      NotificationService.emit("error", error.message ?? "Error desconocido")
      return { data: null, error: error.response?.data?.error ?? error.message }
    }
  }

  /**
   * Sends a POST request with optional parameters and optional payload.
   *
   * @param {string} url - The URL to send data to.
   * @param {P} payload - The optional payload object to include in the request.
   * @param {Q} params - Optional query parameters to include in the request.
   * @return {Promise<ApiResponse<T>>} A promise containing the response data and any error that occurred.
   */
  async post<T, P = Record<string, never>, Q = Record<string, never>>(
    url: string,
    payload?: P,
    params?: Q,
    headers?: AxiosRequestConfig["headers"]
  ): Promise<ApiResponse<T>> {
    const res = { data: null, error: null }

    try {
      const response: AxiosResponse<T> = await ApiServiceSingleton.axios.post<
        T,
        AxiosResponse<T>
      >(url, payload || {}, {
        ...(params ? { params } : {}),
        ...(headers ? { headers } : {}),
      })

      return { ...res, data: response.data }
    } catch (error: any) {
      NotificationService.emit("error", error.message ?? "Error desconocido")
      return { ...res, error: error.response?.data?.error ?? error.message }
    }
  }

  /**
   * Sends a PUT request with optional payload and query parameters.
   *
   * @param {string} url - The URL to send the request to.
   * @param {P} payload - Optional body payload.
   * @param {Q} params - Optional query parameters.
   * @return {Promise<ApiResponse<T>>} A promise containing the response or error.
   */
  async put<T, P = Record<string, never>, Q = Record<string, never>>(
    url: string,
    payload?: P,
    params?: Q
  ): Promise<ApiResponse<T>> {
    const res = { data: null, error: null }

    try {
      const response: AxiosResponse<T> = await ApiServiceSingleton.axios.put<
        T,
        AxiosResponse<T>
      >(url, payload || {}, { ...(params ? { params } : {}) })

      return { ...res, data: response.data }
    } catch (error: any) {
      NotificationService.emit("error", error.message ?? "Error desconocido")
      return { ...res, error: error.response?.data?.error ?? error.message }
    }
  }

  /**
   * Sends a DELETE request.
   *
   * @param {string} url - The URL to send the request to.
   * @return {Promise<ApiResponse<T>>} A promise containing the response or error.
   */
  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const res = { data: null, error: null }

    try {
      const response: AxiosResponse<T> = await ApiServiceSingleton.axios.delete<
        T,
        AxiosResponse<T>
      >(url)

      return { ...res, data: response.data }
    } catch (error: any) {
      NotificationService.emit("error", error.message ?? "Error desconocido")
      return { ...res, error: error.response?.data?.error ?? error.message }
    }
  }
}

let HttpServiceSingleton
if (!(global as globalType).HttpService) {
  HttpServiceSingleton = new HttpService()
} else {
  HttpServiceSingleton = (global as globalType).HttpService
}
export default HttpServiceSingleton as HttpService
