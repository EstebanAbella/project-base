import BotTrainingServiceSingleton from "../../../services/apiService/botTraining"
import { CustomErrorType } from "../../../Utils/Types/global"

import * as t from "../types"

export const getBotTrainings =
  (
    offset: number,
    limit?: number,
    query?: string,
    filter?: string,
    order?: string,
    roles?: string
  ) =>
  (dispatch: (v: any) => void) => {
    dispatch({ type: t.GET_BOT_TRAININGS_FETCHING })
    BotTrainingServiceSingleton.getBotTrainings(
      offset,
      limit,
      query,
      filter,
      order,
      roles
    )
      .then((result) => {
        dispatch({
          type: t.GET_BOT_TRAININGS_FETCH,
          payload: result,
        })
      })
      .catch((error: CustomErrorType) => {
        dispatch({
          type: t.GET_BOT_TRAININGS_FETCH_ERROR,
        })
      })
  }

export const getBotTraining = (id: string) => (dispatch: (v: any) => void) => {
  dispatch({ type: t.GET_BOT_TRAINING_FETCHING })
  BotTrainingServiceSingleton.getBotTraining(id)
    .then((result) => {
      dispatch({
        type: t.GET_BOT_TRAINING_FETCH,
        payload: result,
      })
    })
    .catch((error: CustomErrorType) => {
      dispatch({
        type: t.GET_BOT_TRAINING_FETCH_ERROR,
      })
    })
}

export const createBotTraining =
  (data: { [key: string]: string }) => (dispatch: any) => {
    dispatch({ type: t.CREATE_BOT_TRAINING_FETCHING })
    BotTrainingServiceSingleton.createBotTraining(data)
      .then(() => {
        dispatch({
          type: t.CREATE_BOT_TRAINING_FETCH,
        })
      })
      .catch((error: CustomErrorType) => {
        dispatch({
          type: t.CREATE_BOT_TRAINING_FETCH_ERROR,
        })
      })
  }

export const deleteBotTraining = (id: string) => (dispatch: any) => {
  dispatch({ type: t.DELETE_BOT_TRAINING_FETCHING })
  BotTrainingServiceSingleton.deleteBotTraining(id)
    .then(() => {
      dispatch({
        type: t.DELETE_BOT_TRAINING_FETCH,
      })
    })
    .catch((error: CustomErrorType) => {
      dispatch({
        type: t.DELETE_BOT_TRAINING_FETCH_ERROR,
      })
    })
}

export const editBotTraining =
  (data: { [key: string]: string }) => (dispatch: any) => {
    dispatch({ type: t.EDIT_BOT_TRAINING_FETCHING })
    BotTrainingServiceSingleton.editBotTraining(data)
      .then(() => {
        dispatch({
          type: t.EDIT_BOT_TRAINING_FETCH,
        })
      })
      .catch((error: CustomErrorType) => {
        dispatch({
          type: t.EDIT_BOT_TRAINING_FETCH_ERROR,
        })
      })
  }
