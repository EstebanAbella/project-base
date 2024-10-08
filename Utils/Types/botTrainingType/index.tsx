import { Paginator, ServerStatus } from "../global"

export type BotTrainingResult = {
  name: string
  id: string
}

export type BotTrainingsReducerPropsTypes = {
  botTrainingsStatus: ServerStatus
  botTrainingStatus: ServerStatus
  botTrainingCreateStatus: ServerStatus
  botTrainingDeleteStatus: ServerStatus
  botTrainingEditStatus: ServerStatus
  botTraining?: BotTrainingResult
  botTrainings?: Paginator<BotTrainingResult>
}
