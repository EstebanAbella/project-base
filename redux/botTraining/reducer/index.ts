import { Paginator, ServerStatus } from "../../../Utils/Types/global"
import * as t from "../types"
import * as _t from "../../updater/types"
import {
  BotTrainingResult,
  BotTrainingsReducerPropsTypes,
} from "../../../Utils/Types/botTrainingType"

const botTrainingState: BotTrainingsReducerPropsTypes = {
  botTrainingsStatus: ServerStatus.IDLE,
  botTrainingStatus: ServerStatus.IDLE,
  botTrainingCreateStatus: ServerStatus.IDLE,
  botTrainingDeleteStatus: ServerStatus.IDLE,
  botTrainingEditStatus: ServerStatus.IDLE,
}

export type PossibleActions =
  | { type: "CREATE_BOT_TRAINING_FETCHING" }
  | { type: "CREATE_BOT_TRAINING_FETCH" }
  | { type: "CREATE_BOT_TRAINING_FETCH_ERROR" }
  | { type: "DELETE_BOT_TRAINING_FETCHING" }
  | { type: "DELETE_BOT_TRAINING_FETCH" }
  | { type: "DELETE_BOT_TRAINING_FETCH_ERROR" }
  | { type: "EDIT_BOT_TRAINING_FETCHING" }
  | { type: "EDIT_BOT_TRAINING_FETCH" }
  | { type: "EDIT_BOT_TRAINING_FETCH_ERROR" }
  | { type: "GET_BOT_TRAINING_FETCHING" }
  | { type: "GET_BOT_TRAINING_FETCH"; payload: BotTrainingResult }
  | { type: "GET_BOT_TRAINING_FETCH_ERROR" }
  | { type: "GET_BOT_TRAININGS_FETCHING" }
  | { type: "GET_BOT_TRAININGS_FETCH"; payload: Paginator<BotTrainingResult> }
  | { type: "GET_BOT_TRAININGS_FETCH_ERROR" }
  | { type: "RESET_GLOBAL" }

const reducer = (
  state = botTrainingState,
  action: PossibleActions
): BotTrainingsReducerPropsTypes => {
  const INITIAL_STATE = {
    botTrainingsStatus: ServerStatus.IDLE,
    botTrainingStatus: ServerStatus.IDLE,
    botTrainingCreateStatus: ServerStatus.IDLE,
    botTrainingDeleteStatus: ServerStatus.IDLE,
    botTrainingEditStatus: ServerStatus.IDLE,
  }
  switch (action.type) {
    case t.GET_BOT_TRAININGS_FETCHING: {
      return {
        ...state,
        botTrainingsStatus: ServerStatus.FETCHING,
      }
    }
    case t.GET_BOT_TRAININGS_FETCH: {
      return {
        ...state,
        botTrainingsStatus: ServerStatus.FETCH,
        botTrainings: action.payload,
      }
    }
    case t.GET_BOT_TRAININGS_FETCH_ERROR: {
      return {
        ...state,
        botTrainingsStatus: ServerStatus.FETCH_ERROR,
      }
    }
    case t.GET_BOT_TRAINING_FETCHING: {
      return {
        ...state,
        botTrainingStatus: ServerStatus.FETCHING,
      }
    }
    case t.GET_BOT_TRAINING_FETCH: {
      return {
        ...state,
        botTraining: action.payload,
        botTrainingStatus: ServerStatus.FETCH,
      }
    }
    case t.GET_BOT_TRAINING_FETCH_ERROR: {
      return {
        ...state,
        botTrainingStatus: ServerStatus.FETCH_ERROR,
      }
    }
    case t.CREATE_BOT_TRAINING_FETCHING: {
      return {
        ...state,
        botTrainingCreateStatus: ServerStatus.FETCHING,
      }
    }
    case t.CREATE_BOT_TRAINING_FETCH: {
      return {
        ...state,
        botTrainingCreateStatus: ServerStatus.FETCH,
      }
    }
    case t.CREATE_BOT_TRAINING_FETCH_ERROR: {
      return {
        ...state,
        botTrainingCreateStatus: ServerStatus.FETCH_ERROR,
      }
    }
    case t.DELETE_BOT_TRAINING_FETCHING: {
      return {
        ...state,
        botTrainingDeleteStatus: ServerStatus.FETCHING,
      }
    }
    case t.DELETE_BOT_TRAINING_FETCH: {
      return {
        ...state,
        botTrainingDeleteStatus: ServerStatus.FETCH,
      }
    }
    case t.DELETE_BOT_TRAINING_FETCH_ERROR: {
      return {
        ...state,
        botTrainingDeleteStatus: ServerStatus.FETCH_ERROR,
      }
    }
    case t.EDIT_BOT_TRAINING_FETCHING: {
      return {
        ...state,
        botTrainingEditStatus: ServerStatus.FETCHING,
      }
    }
    case t.EDIT_BOT_TRAINING_FETCH: {
      return {
        ...state,
        botTrainingEditStatus: ServerStatus.FETCH,
      }
    }
    case t.EDIT_BOT_TRAINING_FETCH_ERROR: {
      return {
        ...state,
        botTrainingEditStatus: ServerStatus.FETCH_ERROR,
      }
    }
    case _t.RESET_GLOBAL: {
      state = INITIAL_STATE
    }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
