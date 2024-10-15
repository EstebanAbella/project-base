export type RoleType = "admin" | "user" | "midUser"

export const roleMap: Record<string, RoleType[]> = {
  Users: ["admin"],
  BotTrainings: ["admin", "user"],
}
