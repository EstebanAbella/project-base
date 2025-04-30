import { useGetUser } from "../Users/useUsersData"

export const useUserSelected = () => {
  const { useGetUserHandler, useGetUserData, useGetUserStatus } = useGetUser()
  return { useGetUserHandler, useGetUserData, useGetUserStatus }
}
