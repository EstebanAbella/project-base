import { useState } from "react"
import { ServerStatus } from "../../interface/global"
import { Paginator } from "../../interface/global"
import { clientType } from "./client.interface"
import { clientService } from "../../services/services/clientService"

export const useGetClients = () => {
  const [data, setData] = useState<Paginator<clientType> | null>(null)
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (
    offset?: number,
    limit?: number,
    query?: string,
    filter?: string,
    order?: string,
    roles?: string
  ) => {
    setStatus(ServerStatus.FETCHING)
    try {
      const response = await clientService.getClients(
        offset,
        limit,
        query,
        filter,
        order,
        roles
      )
      setData(response)
      setStatus(ServerStatus.FETCH)
    } catch (err) {
      console.error("Error fetching clients:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useGetClientsHandler: handler,
    useGetClientsData: data,
    useGetClientsStatus: status,
  }
}

export const useGetClient = () => {
  const [data, setData] = useState<clientType | null>(null)
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (id: string) => {
    setStatus(ServerStatus.FETCHING)
    try {
      const response = await clientService.getClient(id)
      setData(response)
      setStatus(ServerStatus.FETCH)
    } catch (err) {
      console.error("Error fetching client:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useGetClientHandler: handler,
    useGetClientData: data,
    useGetClientStatus: status,
  }
}

export const useGetClientsByUserId = () => {
  const [data, setData] = useState<Paginator<clientType> | null>(null)
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (
    id?: string,
    offset?: number,
    limit?: number,
    query?: string,
    filter?: string,
    order?: string,
    roles?: string
  ) => {
    setStatus(ServerStatus.FETCHING)
    try {
      const response = await clientService.getClientsByUserId(
        id,
        offset,
        limit,
        query,
        filter,
        order,
        roles
      )
      setData(response)
      setStatus(ServerStatus.FETCH)
    } catch (err) {
      console.error("Error fetching clients:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useGetClientsByUserIdHandler: handler,
    useGetClientsByUserIdData: data,
    useGetClientsByUserIdStatus: status,
  }
}

export const useCreateClient = () => {
  const [data, setData] = useState<clientType | null>(null)
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (formData: { [key: string]: string }) => {
    setStatus(ServerStatus.FETCHING)
    try {
      const response = await clientService.createClient(formData)
      setData(response as clientType)
      setStatus(ServerStatus.FETCH)
    } catch (err) {
      console.error("Error creating client:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useCreateClientHandler: handler,
    useCreateClientData: data,
    useCreateClientStatus: status,
  }
}

export const useEditClient = () => {
  const [data, setData] = useState<clientType | null>(null)
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (formData: { [key: string]: string }) => {
    setStatus(ServerStatus.FETCHING)
    try {
      const response = await clientService.editClient(formData)
      setData(response as clientType)
      setStatus(ServerStatus.FETCH)
    } catch (err) {
      console.error("Error editing client:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useEditClientHandler: handler,
    useEditClientData: data,
    useEditClientStatus: status,
  }
}

export const useDeleteClient = () => {
  const [data, setData] = useState<clientType | null>(null)
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (id: string) => {
    setStatus(ServerStatus.FETCHING)
    try {
      const response = await clientService.deleteClient(id)
      setData(response as clientType)
      setStatus(ServerStatus.FETCH)
    } catch (err) {
      console.error("Error deleting client:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useDeleteClientHandler: handler,
    useDeleteClientData: data,
    useDeleteClientStatus: status,
  }
}
