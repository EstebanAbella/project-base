import { Paginator } from "../../interface/global"
import { clientType } from "../../view/Clients/client.interface"
import ApiServiceSingleton from "./ApiService"

export interface globalType {
  ClientService?: ClientService
}

const apiUrls = {
  /* client */
  clients: "/v1/clients",
  clientsByUserId: "/v1/clientsByUserId",
}

class ClientService {
  constructor() {
    if ((global as globalType).ClientService) {
      throw new Error("ClientService instance already exists!")
    }
    ;(global as globalType).ClientService = this
  }

  getInstance(): this {
    return this
  }

  async getClient(id: string): Promise<clientType> {
    return await new Promise<clientType>((resolve, reject) => {
      ApiServiceSingleton.axios
        .get(`${apiUrls.clients}/${id}`)
        .then((response) => {
          const client = response.data.client as clientType
          resolve(client)
        })
        .catch((e) => {
          reject(ApiServiceSingleton.errorComposer(e))
        })
    })
  }

  async getClients(
    offset?: number,
    limit?: number,
    query?: string,
    filter?: string,
    order?: string,
    roles?: string
  ): Promise<Paginator<clientType>> {
    return await new Promise<Paginator<clientType>>((resolve, reject) => {
      const params = {
        offset,
        limit,
        q: query,
        searchIn: filter,
        sort: order,
        roles,
      }
      ApiServiceSingleton.axios
        .get(`${apiUrls.clients}`, { params })
        .then((response) => {
          const formatedItems = response.data.clients.map((u: clientType) => {
            return {
              ...u,
            }
          })
          resolve(formatedItems)
        })
        .catch((e) => {
          reject(ApiServiceSingleton.errorComposer(e))
        })
    })
  }
  async createClient(submittedData: { [key: string]: string }): Promise<{}> {
    return await new Promise<{}>((resolve, reject) => {
      ApiServiceSingleton.axios
        .post(`${apiUrls.clients}`, submittedData)
        .then((response) => {
          const client = response.data as clientType
          resolve(client)
        })
        .catch((e) => {
          reject(ApiServiceSingleton.errorComposer(e))
        })
    })
  }

  async deleteClient(id: string): Promise<{}> {
    return await new Promise<{}>((resolve, reject) => {
      ApiServiceSingleton.axios
        .delete(`${apiUrls.clients}/${id}`)
        .then((response) => {
          const client = response.data as clientType
          resolve(client)
        })
        .catch((e) => {
          reject(ApiServiceSingleton.errorComposer(e))
        })
    })
  }
  async editClient(submittedData: any): Promise<{}> {
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
          .put(`${apiUrls.clients}/${submittedData.id}`, submittedData)
          .then((response) => {
            const client = response.data as clientType
            resolve(client)
          })
          .catch((e) => {
            reject(ApiServiceSingleton.errorComposer(e))
          })
      }
    })
  }

  async getClientsByUserId(
    id?: string,
    offset?: number,
    limit?: number,
    query?: string,
    filter?: string,
    order?: string,
    roles?: string
  ): Promise<Paginator<clientType>> {
    return await new Promise<Paginator<clientType>>((resolve, reject) => {
      const params = {
        offset,
        limit,
        q: query,
        searchIn: filter,
        sort: order,
        roles,
      }
      ApiServiceSingleton.axios
        .get(`${apiUrls.clientsByUserId}/${id}`, { params })
        .then((response) => {
          resolve(response.data.clients)
        })
        .catch((e) => {
          reject(ApiServiceSingleton.errorComposer(e))
        })
    })
  }
}

let ClientServiceSingleton
if (!(global as globalType).ClientService)
  ClientServiceSingleton = new ClientService()
else ClientServiceSingleton = (global as globalType).ClientService
export default ClientServiceSingleton as ClientService
