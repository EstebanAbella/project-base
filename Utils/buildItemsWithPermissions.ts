import { useAuthContext } from "../context/auth/AuthContext"
import { TSectionName } from "../interface/global"

export function buildItemsWithPermissions<T extends { section: TSectionName }>(
  itemsArray: T[]
): T[] {
  const { user } = useAuthContext()
  const itemsWithPermissions = itemsArray.filter((item) =>
    user?.permissions[item.section]?.includes("view")
  )
  return itemsWithPermissions
}
