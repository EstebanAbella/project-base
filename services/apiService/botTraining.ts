import { BotTrainingResult } from "../../Utils/Types/botTrainingType"
import { Paginator } from "../../Utils/Types/global"
import ApiServiceSingleton from "./ApiService"
import axios, { AxiosInstance } from "axios"

export interface globalType {
  BotTrainingService?: BotTrainingService
}

const apiUrls = {
  /* bot training */
  botTraining: "/templates",
}

class BotTrainingService {
  constructor() {
    if ((global as globalType).BotTrainingService) {
      throw new Error("BotTrainingService instance already exists!")
    }
    ;(global as globalType).BotTrainingService = this
  }

  getInstance(): this {
    return this
  }

  async getBotTraining(id: string): Promise<BotTrainingResult> {
    try {
      // const response = await ApiServiceSingleton.axios.get(
      //   `${apiUrls.botTraining}/${id}`
      // )
      const response = await axios.get(
        `https://classy-veil-seashore.glitch.me/templates/${id}`
      )
      const data = response.data as BotTrainingResult
      return data
    } catch (e) {
      throw ApiServiceSingleton.errorComposer(e)
    }
  }

  async getBotTrainings(
    offset?: number,
    limit?: number,
    query?: string,
    filter?: string,
    order?: string,
    roles?: string
  ): Promise<Paginator<BotTrainingResult>> {
    try {
      const params = {
        offset,
        limit,
        query,
        searchIn: filter,
        // sort: order,
        // roles,
      }
      if (!params.query) delete params.query
      if (params.searchIn === "id") delete params.searchIn
      // const response = await ApiServiceSingleton.axios.get(
      //   `${apiUrls.botTraining}`,
      //   { params }
      // )
      const response = await axios.get(
        `https://classy-veil-seashore.glitch.me/templates`,
        { params }
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      )
      return response.data as Paginator<BotTrainingResult>
    } catch (e) {
      throw ApiServiceSingleton.errorComposer(e)
    }
  }

  async createBotTraining(submittedData: {
    [key: string]: string
  }): Promise<{}> {
    try {
      // const response = await ApiServiceSingleton.axios.post(
      //   `${apiUrls.botTraining}`,
      //   submittedData
      // )
      const response = await axios.post(
        `https://classy-veil-seashore.glitch.me/templates`,
        submittedData
      )
      const data = response.data as BotTrainingResult
      return data
    } catch (e) {
      throw ApiServiceSingleton.errorComposer(e)
    }
  }

  async deleteBotTraining(id: string): Promise<{}> {
    try {
      // const response = await ApiServiceSingleton.axios.delete(
      //   `${apiUrls.botTraining}/${id}`
      // )
      const response = await axios.delete(
        `https://classy-veil-seashore.glitch.me/templates/${id}`
      )
      const data = response.data as BotTrainingResult
      return data
    } catch (e) {
      throw ApiServiceSingleton.errorComposer(e)
    }
  }

  async editBotTraining(submittedData: any): Promise<{}> {
    try {
      const { id } = submittedData
      if (!id) {
        throw new Error("invalidId")
      }
      // const response = await ApiServiceSingleton.axios.put(
      //   `${apiUrls.botTraining}/${id}`,
      //   submittedData
      // )
      const response = await axios.put(
        `https://classy-veil-seashore.glitch.me/templates/${id}`,
        submittedData
      )
      const data = response.data as BotTrainingResult
      return data
    } catch (e) {
      throw ApiServiceSingleton.errorComposer(e)
    }
  }
}

let BotTrainingServiceSingleton
if (!(global as globalType).BotTrainingService)
  BotTrainingServiceSingleton = new BotTrainingService()
else BotTrainingServiceSingleton = (global as globalType).BotTrainingService
export default BotTrainingServiceSingleton as BotTrainingService
