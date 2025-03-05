export type Paginator<T> = {
  items: T[]
  count: number
  actualPage: number
  pages: number
}

export type CustomErrorType = {
  statusCode: number
  statusMessage: string
}

export enum ServerStatus {
  IDLE,
  FETCHING,
  FETCH,
  FETCH_ERROR,
}

/* Redux Dispatc Obj */
export type DispatchObject<T> = ({
  type,
  payload,
}: {
  type: string
  payload: T
}) => any
export type DispatchEmptyObject = ({ type }: { type: string }) => any
