import { Paginator } from "../../interface/global"
import { UserResult } from "../../view/Users/user.interface"
import UserServiceSingleton from "../apiService/user"

export class UserService {
  constructor() {}

  async getUser(id: string): Promise<UserResult> {
    try {
      return await UserServiceSingleton.getUser(id)
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
    try {
      return await UserServiceSingleton.getUsers(
        offset,
        limit,
        query,
        filter,
        order,
        roles
      )
    } catch (error) {
      throw error
    }
  }

  async createUser(data: Record<string, string>): Promise<{}> {
    try {
      return await UserServiceSingleton.createUser(data)
    } catch (error) {
      throw error
    }
  }

  async deleteUser(id: string): Promise<{}> {
    try {
      return await UserServiceSingleton.deleteUser(id)
    } catch (error) {
      throw error
    }
  }

  async editUser(data: any): Promise<{}> {
    try {
      return await UserServiceSingleton.editUser(data)
    } catch (error) {
      throw error
    }
  }
}

export const userService = new UserService()
