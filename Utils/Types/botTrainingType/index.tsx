import { Paginator, ServerStatus } from "../global"

export type BotTrainingResult = {
  id: number
  body: string
  footer: string
  seed: string
  trigger: string
  type: string
  options: string[]
  additional_actions: Array<{
    type: string
    reaction?: string
    sticker_name?: string
    delay?: number
  }>
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
