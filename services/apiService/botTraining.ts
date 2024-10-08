import { BotTrainingResult } from "../../Utils/Types/botTrainingType"
import { Paginator } from "../../Utils/Types/global"
import ApiServiceSingleton from "./ApiService"

export interface globalType {
  BotTrainingService?: BotTrainingService
}

const apiUrls = {
  /* bot training */
  botTraining: "/v1/users",
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

  // async getBotTraining(id: string): Promise<BotTrainingResult> {
  //   return await new Promise<BotTrainingResult>((resolve, reject) => {
  //     ApiServiceSingleton.axios
  //       .get(`${apiUrls.botTraining}/${id}`)
  //       .then((response) => {
  //         const data = response.data.user as BotTrainingResult
  //         resolve(data)
  //       })
  //       .catch((e) => {
  //         reject(ApiServiceSingleton.errorComposer(e))
  //       })
  //   })
  // }
  async getBotTraining(id: string): Promise<BotTrainingResult> {
    try {
      const response = await ApiServiceSingleton.axios.get(
        `${apiUrls.botTraining}/${id}`
      )
      const data = response.data.user as BotTrainingResult
      return data
    } catch (e) {
      throw ApiServiceSingleton.errorComposer(e)
    }
  }

  // async getBotTrainings(
  //   offset?: number,
  //   limit?: number,
  //   query?: string,
  //   filter?: string,
  //   order?: string,
  //   roles?: string
  // ): Promise<Paginator<BotTrainingResult>> {
  //   return await new Promise<Paginator<BotTrainingResult>>(
  //     (resolve, reject) => {
  //       const params = {
  //         offset,
  //         limit,
  //         q: query,
  //         searchIn: filter,
  //         sort: order,
  //         roles,
  //       }
  //       if (!params.q) delete params.q
  //       if (params.searchIn === "id") delete params.searchIn

  //       ApiServiceSingleton.axios
  //         .get(`${apiUrls.botTraining}`, { params })
  //         .then((response) => {
  //           resolve(response.data.users)
  //         })
  //         .catch((e) => {
  //           reject(ApiServiceSingleton.errorComposer(e))
  //         })
  //     }
  //   )
  // }
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
        q: query,
        searchIn: filter,
        sort: order,
        roles,
      }
      if (!params.q) delete params.q
      if (params.searchIn === "id") delete params.searchIn
      const response = await ApiServiceSingleton.axios.get(
        `${apiUrls.botTraining}`,
        { params }
      )
      return response.data.users as Paginator<BotTrainingResult>
    } catch (e) {
      throw ApiServiceSingleton.errorComposer(e)
    }
  }

  // async createBotTraining(submittedData: {
  //   [key: string]: string
  // }): Promise<{}> {
  //   return await new Promise<{}>((resolve, reject) => {
  //     ApiServiceSingleton.axios
  //       .post(`${apiUrls.botTraining}`, submittedData)
  //       .then((response) => {
  //         const data = response.data as BotTrainingResult
  //         resolve(data)
  //       })
  //       .catch((e) => {
  //         reject(ApiServiceSingleton.errorComposer(e))
  //       })
  //   })
  // }
  async createBotTraining(submittedData: {
    [key: string]: string
  }): Promise<{}> {
    try {
      const response = await ApiServiceSingleton.axios.post(
        `${apiUrls.botTraining}`,
        submittedData
      )
      const data = response.data as BotTrainingResult
      return data
    } catch (e) {
      throw ApiServiceSingleton.errorComposer(e)
    }
  }

  // async deleteBotTraining(id: string): Promise<{}> {
  //   return await new Promise<{}>((resolve, reject) => {
  //     ApiServiceSingleton.axios
  //       .delete(`${apiUrls.botTraining}/${id}`)
  //       .then((response) => {
  //         const data = response.data as BotTrainingResult
  //         resolve(data)
  //       })
  //       .catch((e) => {
  //         reject(ApiServiceSingleton.errorComposer(e))
  //       })
  //   })
  // }
  async deleteBotTraining(id: string): Promise<{}> {
    try {
      const response = await ApiServiceSingleton.axios.delete(
        `${apiUrls.botTraining}/${id}`
      )
      const data = response.data as BotTrainingResult
      return data
    } catch (e) {
      throw ApiServiceSingleton.errorComposer(e)
    }
  }

  // async editBotTraining(submittedData: any): Promise<{}> {
  //   const { name, id, email, role, password } = submittedData
  //   const newData = {
  //     name,
  //     id,
  //     email,
  //     role,
  //     password,
  //   }
  //   return await new Promise<{}>((resolve, reject) => {
  //     if (!submittedData.id) reject(new Error("invalidId"))
  //     else {
  //       ApiServiceSingleton.axios
  //         // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  //         .put(`${apiUrls.botTraining}/${submittedData.id}`, submittedData)
  //         .then((response) => {
  //           const data = response.data as BotTrainingResult
  //           resolve(data)
  //         })
  //         .catch((e) => {
  //           reject(ApiServiceSingleton.errorComposer(e))
  //         })
  //     }
  //   })
  // }
  async editBotTraining(submittedData: any): Promise<{}> {
    try {
      const { name, id, email, role, password } = submittedData
      if (!id) {
        throw new Error("invalidId")
      }
      const response = await ApiServiceSingleton.axios.put(
        `${apiUrls.botTraining}/${id}`,
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
