import { useEffect } from "react"
import { useGetClient } from "../Clients/useClientsData"

export const useClientSelected = (param: string) => {
  const { useGetClientHandler, useGetClientData, useGetClientStatus } =
    useGetClient()

  useEffect(() => {
    if (param) {
      useGetClientHandler(param as string)
    }
  }, [])
  return { useGetClientHandler, useGetClientData, useGetClientStatus }
}
