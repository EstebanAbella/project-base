import { TPermissionName, TSectionName } from "../interface/global"

export const Frontend = {
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
}
export const INTERVAL_OF_UPDATED_IN_MINS = 60
export const WAIT_PER_NEXT_UPDATING_IN_MINS = 0

//
export const SECTIONS_NAMES = ["users", "userSelected", "clients"] as const

export const PERMISSIONS_NAMES = [
  "view",
  "create",
  "update",
  "delete",
  "import",
  "export",
] as const

export const PERMISSIONS: Record<TPermissionName, TPermissionName> = {
  view: "view",
  create: "create",
  update: "update",
  delete: "delete",
  import: "import",
  export: "export",
}

export const SECTIONS: Record<TSectionName, TSectionName> = {
  users: "users",
  userSelected: "userSelected",
  clients: "clients",
}
