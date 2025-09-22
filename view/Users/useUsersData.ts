import { useState } from "react"
import { ServerStatus } from "../../interface/global"
import { Paginator } from "../../interface/global"
import { UserResult } from "./user.interface"
import { userService } from "../../services/services/userService"

export const useGetUsers = () => {
  const [data, setData] = useState<Paginator<UserResult> | null>(null)
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
      const response = await userService.getUsers(
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
      console.error("Error fetching users:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useGetUsersHandler: handler,
    useGetUsersData: data,
    useGetUsersStatus: status,
  }
}

export const useGetUser = () => {
  const [data, setData] = useState<UserResult | null>(null)
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (id: string) => {
    setStatus(ServerStatus.FETCHING)
    try {
      const response = await userService.getUser(id)
      setData(response)
      setStatus(ServerStatus.FETCH)
    } catch (err) {
      console.error("Error fetching user:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useGetUserHandler: handler,
    useGetUserData: data,
    useGetUserStatus: status,
  }
}

export const useCreateUser = () => {
  const [data, setData] = useState<UserResult | null>(null)
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (formData: { [key: string]: string }) => {
    setStatus(ServerStatus.FETCHING)
    try {
      const response = await userService.createUser(formData)
      setData(response as UserResult)
      setStatus(ServerStatus.FETCH)
    } catch (err) {
      console.error("Error creating user:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useCreateUserHandler: handler,
    useCreateUserData: data,
    useCreateUserStatus: status,
  }
}

export const useEditUser = () => {
  const [data, setData] = useState<UserResult | null>(null)
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (formData: { [key: string]: string }) => {
    setStatus(ServerStatus.FETCHING)
    try {
      const response = await userService.editUser(formData)
      setData(response as UserResult)
      setStatus(ServerStatus.FETCH)
    } catch (err) {
      console.error("Error editing user:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useEditUserHandler: handler,
    useEditUserData: data,
    useEditUserStatus: status,
  }
}

export const useDeleteUser = () => {
  const [data, setData] = useState<UserResult | null>(null)
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (id: string) => {
    setStatus(ServerStatus.FETCHING)
    try {
      const response = await userService.deleteUser(id)
      setData(response as UserResult)
      setStatus(ServerStatus.FETCH)
    } catch (err) {
      console.error("Error deleting user:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useDeleteUserHandler: handler,
    useDeleteUserData: data,
    useDeleteUserStatus: status,
  }
}
