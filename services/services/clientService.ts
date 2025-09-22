import { apiUrls } from "../../apiService/apiUrl"
import HttpServiceSingleton from "../../apiService/HttpService"
import { PaginatedQueryParams, Paginator } from "../../interface/global"
import { clientType } from "../../view/Clients/client.interface"

export class ClientService {
  constructor() {}

  async getClient(id: string): Promise<clientType> {
    try {
      const { data, error } = await HttpServiceSingleton.get<{
        client: clientType
      }>(`${apiUrls.clients}/${id}`)
      if (error) throw error
      return data!.client
    } catch (error) {
      throw error
    }
  }

  async getClients(
    offset?: number,
    limit?: number,
    query?: string,
    filter?: string,
    order?: string,
    roles?: string
  ): Promise<Paginator<clientType>> {
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
          clients: Paginator<clientType>
        },
        PaginatedQueryParams
      >(apiUrls.clients, params)
      if (error) throw error
      return data!.clients
    } catch (error) {
      throw error
    }
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
          clients: Paginator<clientType>
        },
        PaginatedQueryParams
      >(`${apiUrls.clientsByUserId}/${id}`, params)
      if (error) throw error
      return data!.clients
    } catch (error) {
      throw error
    }
  }

  async createClient(data: { [key: string]: string }): Promise<{}> {
    try {
      const { data: responseData, error } = await HttpServiceSingleton.post<
        {},
        { [key: string]: string }
      >(apiUrls.clients, data)
      if (error) throw error
      return responseData!
    } catch (error) {
      throw error
    }
  }

  async deleteClient(id: string): Promise<{}> {
    try {
      const { data: responseData, error } =
        await HttpServiceSingleton.delete<{}>(`${apiUrls.clients}/${id}`)
      if (error) throw error
      return responseData!
    } catch (error) {
      throw error
    }
  }

  async editClient(data: { [key: string]: string }): Promise<{}> {
    try {
      if (!data.id) throw new Error("invalidId")
      const { data: responseData, error } = await HttpServiceSingleton.put<
        {},
        { [key: string]: string }
      >(`${apiUrls.clients}/${data.id}`, data)
      if (error) throw error
      return responseData!
    } catch (error) {
      throw error
    }
  }
}

export const clientService = new ClientService()
