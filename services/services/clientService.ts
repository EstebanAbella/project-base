import { Paginator } from "../../interface/global"
import { clientType } from "../../view/Clients/client.interface"
import clientServiceSingleton from "../apiService/client"

export class ClientService {
  constructor() {}

  async getClient(id: string): Promise<clientType> {
    try {
      return await clientServiceSingleton.getClient(id)
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
    try {
      return await clientServiceSingleton.getClients(
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

  async getClientsByUserId(
    id?: string,
    offset?: number,
    limit?: number,
    query?: string,
    filter?: string,
    order?: string,
    roles?: string
  ): Promise<Paginator<clientType>> {
    try {
      return await clientServiceSingleton.getClientsByUserId(
        id,
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

  async createClient(data: Record<string, string>): Promise<{}> {
    try {
      return await clientServiceSingleton.createClient(data)
    } catch (error) {
      throw error
    }
  }

  async deleteClient(id: string): Promise<{}> {
    try {
      return await clientServiceSingleton.deleteClient(id)
    } catch (error) {
      throw error
    }
  }

  async editClient(data: any): Promise<{}> {
    try {
      return await clientServiceSingleton.editClient(data)
    } catch (error) {
      throw error
    }
  }
}

export const clientService = new ClientService()
