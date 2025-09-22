import { apiUrls } from "../../apiService/apiUrl"
import HttpServiceSingleton from "../../apiService/HttpService"
import { PaginatedQueryParams, Paginator } from "../../interface/global"
import { UserResult } from "../../view/Users/user.interface"

export class UserService {
  constructor() {}

  async getUser(id: string): Promise<UserResult> {
    try {
      const { data, error } = await HttpServiceSingleton.get<{
        user: UserResult
      }>(`${apiUrls.users}/${id}`)

      if (error) throw error

      return data!.user
    } catch (error) {
      throw error
    }
  }

  async getUsers(
    offset?: number,
    limit?: number,
    query?: string,
    filter?: string,
    order?: string,
    roles?: string
  ): Promise<Paginator<UserResult>> {
    const params = {
      ...(offset !== undefined && { offset }),
      ...(limit !== undefined && { limit }),
      ...(query && { q: query }),
      ...(filter && { searchIn: filter }),
      ...(order && { sort: order }),
      ...(roles && { roles }),
    }

    try {
      const { data, error } = await HttpServiceSingleton.get<
        {
          users: Paginator<UserResult>
        },
        PaginatedQueryParams
      >(apiUrls.users, params)

      if (error) throw error

      return data!.users
    } catch (error) {
      throw error
    }
  }

  async createUser(data: { [key: string]: string }): Promise<{}> {
    try {
      const { data: responseData, error } = await HttpServiceSingleton.post<
        {},
        { [key: string]: string }
      >(apiUrls.users, data)
      if (error) throw error
      return responseData!
    } catch (err) {
      throw err
    }
  }

  async deleteUser(id: string): Promise<{}> {
    try {
      const { data: responseData, error } =
        await HttpServiceSingleton.delete<{}>(`${apiUrls.users}/${id}`)
      if (error) throw error
      return responseData!
    } catch (err) {
      throw err
    }
  }

  async editUser(data: { [key: string]: string }): Promise<{}> {
    try {
      if (!data.id) throw new Error("invalidId")
      const { data: responseData, error } = await HttpServiceSingleton.put<
        {},
        { [key: string]: string }
      >(`${apiUrls.users}/${data.id}`, data)
      if (error) throw error
      return responseData!
    } catch (err) {
      throw err
    }
  }
}

export const userService = new UserService()
