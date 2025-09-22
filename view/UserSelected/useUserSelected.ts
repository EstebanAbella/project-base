import { useEffect } from "react"
import { useGetUser } from "../Users/useUsersData"

export const useUserSelected = (param: string) => {
  const { useGetUserHandler, useGetUserData, useGetUserStatus } = useGetUser()

  useEffect(() => {
    if (param) {
      useGetUserHandler(param as string)
    }
  }, [])

  return { useGetUserHandler, useGetUserData, useGetUserStatus }
}
