import ApiServiceSingleton from "../../api/ApiService"
import { Paginator } from "../../interface/global"
import { UserResult } from "../../view/Users/user.interface"

export interface globalType {
  UserService?: UserService
}

const apiUrls = {
  /* users */
  users: "/v1/users",
}

class UserService {
  constructor() {
    if ((global as globalType).UserService) {
      throw new Error("UserService instance already exists!")
    }
    ;(global as globalType).UserService = this
  }

  getInstance(): this {
    return this
  }

  async getUser(id: string): Promise<UserResult> {
    return await new Promise<UserResult>((resolve, reject) => {
      ApiServiceSingleton.axios
        .get(`${apiUrls.users}/${id}`)
        .then((response) => {
          const user = response.data.user as UserResult
          resolve(user)
        })
        .catch((e) => {
          reject(ApiServiceSingleton.errorComposer(e))
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
  ): Promise<Paginator<UserResult>> {
    return await new Promise<Paginator<UserResult>>((resolve, reject) => {
      const params = {
        offset,
        limit,
        q: query,
        searchIn: filter,
        sort: order,
        roles,
      }
      ApiServiceSingleton.axios
        .get(`${apiUrls.users}`, { params })
        .then((response) => {
          resolve(response.data.users)
        })
        .catch((e) => {
          reject(ApiServiceSingleton.errorComposer(e))
        })
    })
  }
  async createUser(submittedData: { [key: string]: string }): Promise<{}> {
    return await new Promise<{}>((resolve, reject) => {
      ApiServiceSingleton.axios
        .post(`${apiUrls.users}`, submittedData)
        .then((response) => {
          const user = response.data as UserResult
          resolve(user)
        })
        .catch((e) => {
          reject(ApiServiceSingleton.errorComposer(e))
        })
    })
  }

  async deleteUser(id: string): Promise<{}> {
    return await new Promise<{}>((resolve, reject) => {
      ApiServiceSingleton.axios
        .delete(`${apiUrls.users}/${id}`)
        .then((response) => {
          const user = response.data as UserResult
          resolve(user)
        })
        .catch((e) => {
          reject(ApiServiceSingleton.errorComposer(e))
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
      if (!submittedData.id) reject(new Error("invalidId"))
      else {
        ApiServiceSingleton.axios
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          .put(`${apiUrls.users}/${submittedData.id}`, submittedData)
          .then((response) => {
            const user = response.data as UserResult
            resolve(user)
          })
          .catch((e) => {
            reject(ApiServiceSingleton.errorComposer(e))
          })
      }
    })
  }
}

let UserServiceSingleton
if (!(global as globalType).UserService)
  UserServiceSingleton = new UserService()
else UserServiceSingleton = (global as globalType).UserService
export default UserServiceSingleton as UserService
