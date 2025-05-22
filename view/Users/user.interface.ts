import { TPermissionsObject } from "../../interface/global"

export type UserResult = {
  name: string
  id: string
  email: string
  role: string
  permissions: TPermissionsObject
}
