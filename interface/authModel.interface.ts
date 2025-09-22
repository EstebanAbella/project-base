import { TPermissionsObject } from "./global"

export type loggedUser = {
  name: string
  id?: string
  email: string
  password: string
  role: string
  token?: string
  permissions: TPermissionsObject
}
