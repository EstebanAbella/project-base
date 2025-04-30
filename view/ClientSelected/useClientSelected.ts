import { useGetClient } from "../Clients/useClientsData"

export const useClientSelected = () => {
  const { useGetClientHandler, useGetClientData, useGetClientStatus } =
    useGetClient()
  return { useGetClientHandler, useGetClientData, useGetClientStatus }
}
