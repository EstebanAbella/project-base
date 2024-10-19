import { Paginator, ServerStatus } from "../global"

export type BotTrainingResult = {
  additional_actions: { reaction: string; type: "" }
  body: string
  footer: string
  id: number
  options: string[]
  seed: string
  trigger: string
  type: string
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
