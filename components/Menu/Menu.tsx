"use client"
import { ChangeTheme } from "../ChangeTheme/ChangeTheme"
import { useRouter } from "next/navigation"
import { Button } from "../Button"
import { ButtonType } from "../Button/Button"
import { useAuthContext } from "../../context/auth/AuthContext"
import { ServerStatus } from "../../interface/global"
import LocalDataService from "../../services/LocalDataService"
import { TSidebarItem } from "./Menu.interface"
import { buildItemsWithPermissions } from "../../Utils/buildItemsWithPermissions"

export const sidebarItemsArray: TSidebarItem[] = [
  {
    value: "Users",
    type: ButtonType.TERTIARY,
    icon: "icon-user",
    route: "/users",
    section: "users",
  },
  {
    value: "Clients",
    type: ButtonType.TERTIARY,
    icon: "icon-user",
    route: "/clients",
    section: "clients",
  },
]

export const MenuComponent = () => {
  const { setLoginStatus, setUser } = useAuthContext()
  const itemsSidebar = buildItemsWithPermissions(sidebarItemsArray)
  const router = useRouter()

  return (
    <header>
      {itemsSidebar?.map((item) => {
        return (
          <Button
            key={item.route}
            value={item.value}
            type={item.type}
            icon={item.icon}
            onClick={() => router.push(`${item.route}`)}
          />
        )
      })}

      <Button
        value={"Logout"}
        type={ButtonType.TERTIARY}
        icon={"icon-log-in"}
        onClick={() => {
          setLoginStatus(ServerStatus.IDLE)
          setUser(null)
          LocalDataService.clearData()
          window.location.href = "/login"
        }}
      ></Button>

      <div className='changeThemeContainer'>
        <ChangeTheme></ChangeTheme>
        <span className='icon-dark-mode-svgrepo-com'></span>
      </div>
    </header>
  )
}
