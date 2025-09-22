import { PERMISSIONS_NAMES, SECTIONS_NAMES } from "../Utils/Constants"

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

export type TBaseError = {
  message: string
  status: number
  reasons: string
}

export type SearchQueryParams = Partial<{
  searchIn: string
  q: string
}>

export type PaginatedQueryParams = Partial<
  {
    order: "ASC" | "DESC"
    limit: number
    offset: number
    roles: string
  } & SearchQueryParams
>

export type TSectionName = (typeof SECTIONS_NAMES)[number]
export type TPermissionName = (typeof PERMISSIONS_NAMES)[number]

export type TPermissionsObject = Partial<
  Record<TSectionName, TPermissionName[]>
>
