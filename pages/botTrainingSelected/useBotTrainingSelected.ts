import { useEffect, useState } from "react"
import BotTrainingServiceSingleton from "../../services/apiService/botTraining"
import { ServerStatus } from "../../Utils/Types/global"

export const useGetBotTraining = () => {
  const [data, setData] = useState<any>()
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (id: string) => {
    setStatus(ServerStatus.FETCHING)
    try {
      const response = await BotTrainingServiceSingleton.getBotTraining(id)
      setData(response)
      setStatus(ServerStatus.FETCH)
    } catch (err) {
      console.error("Error getting bot training:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useGetBotTrainingHandler: handler,
    useGetBotTrainingData: data,
    useGetBotTrainingStatus: status,
  }
}

export const useCreateBotTraining = () => {
  const [data, setData] = useState<any>()
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (formData: { [key: string]: string }) => {
    setStatus(ServerStatus.FETCHING)
    try {
      const response =
        await BotTrainingServiceSingleton.createBotTraining(formData)
      setData(response)
      setStatus(ServerStatus.FETCH)
    } catch (err) {
      console.error("Error creating bot training:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useCreateBotTrainingHandler: handler,
    useCreateBotTrainingData: data,
    useCreateBotTrainingStatus: status,
  }
}

export const useEditBotTraining = () => {
  const [data, setData] = useState<any>()
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (formData: { [key: string]: string }) => {
    setStatus(ServerStatus.FETCHING)
    try {
      const response =
        await BotTrainingServiceSingleton.editBotTraining(formData)
      setData(response)
      setStatus(ServerStatus.FETCH)
    } catch (err) {
      console.error("Error editing bot training:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useEditBotTrainingHandler: handler,
    useEditBotTrainingData: data,
    useEditBotTrainingStatus: status,
  }
}
