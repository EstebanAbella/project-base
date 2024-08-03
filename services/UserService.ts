import jsonwebtoken from 'jsonwebtoken'
import { loggedUser, mocked_users } from '../models/models'

export type globalType = {
  userService?: UserService
}

let currentId = 1
class UserService {
  users: loggedUser[]

  constructor() {
    if ((global as globalType).userService) {
      throw new Error('New instance cannot be created!!')
    } else {
      this.users = mocked_users
      if (this.users.length > 0) {
        currentId = Math.max(...this.users.map(user => parseInt(user.id || '0'))) + 1
      }
    }
    ;(global as globalType).userService = this
  }

  login(email: string, password: string): loggedUser | undefined {
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    )
    if (!user) return undefined
    const jwt = {
      id: user?.id,
      email: user?.email,
    }
    const accessToken = jsonwebtoken.sign(
      jwt,
      process.env.ACCESS_TOKEN_SECRET || '',
      { expiresIn: '24h' }
    )
    user.token = accessToken
    return user
  }

  getAllUsers() {
    return this.users
  }

  validateUser(user: loggedUser) {
    if (
      user.name == undefined ||
      user.name == null ||
      user.email == undefined ||
      user.email == null ||
      user.password == undefined ||
      user.password == null
    )
      return false
    return true
  }

  addUser(newUser: loggedUser) {
    newUser.id = currentId.toString()
    currentId++
    this.users.push(newUser)
    return newUser
  }

  updateUser(
    newUser: loggedUser,
    options: { where: (user: loggedUser) => boolean }
  ) {
    let returnUser: loggedUser | undefined
    this.users = this.users.map((user) => {
      if (options.where(user)) {
        returnUser = newUser
        return newUser
      }
      return user
    })
    return returnUser
  }

  deleteUser(id: string): loggedUser | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id)
    if (userIndex !== -1) {
      const deletedUser = this.users.splice(userIndex, 1)[0]
      return deletedUser
    }
    return undefined
  }
}

let userServiceSingleton
if (!(global as globalType).userService)
  userServiceSingleton = new UserService()
else userServiceSingleton = (global as globalType).userService
export default userServiceSingleton as UserService
