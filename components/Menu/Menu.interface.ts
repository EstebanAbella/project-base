import { TSectionName } from "../../interface/global"
import { ButtonType } from "../Button/Button"

export type TSidebarItem = {
  value: string
  type: ButtonType
  icon: string
  route: string
  section: TSectionName
}
