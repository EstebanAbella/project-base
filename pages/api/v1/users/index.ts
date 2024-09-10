import type { NextApiRequest, NextApiResponse } from 'next'
import { loggedUser, Paginator } from '../../../../models/models'
import { withAuthController } from '../../../../controller/withAuthController'
import { generateInvalidError } from '../../../../helpers/errors'
import UserService from '../../../../services/UserService'

interface DataSuccess {
  message: String
  users?: Paginator<loggedUser>
  user?: loggedUser
}

interface DataError {
  message: String
}
type Data = DataSuccess | DataError

const route = (req: NextApiRequest, res: NextApiResponse<Data>): void => {
  switch (req.method) {
    case 'GET': {
        const { offset = 0, limit = 10, q, searchIn } = req.query
        const offsetNumber = parseInt(offset as string)
        const limitNumber = parseInt(limit as string)
        const searchQuery = (searchIn as string).toLowerCase()
        const allUsers = UserService.getAllUsers().filter((data) =>
          data.name.toLowerCase().includes(searchQuery)
        )
        const paginatedUsers = allUsers.slice(offsetNumber, offsetNumber + limitNumber)
        const totalItems = allUsers.length
        const users: Paginator<loggedUser> = {
          items: paginatedUsers,
          count: totalItems,
          actualPage: Math.ceil(offsetNumber / limitNumber) + 1,
          pages: Math.ceil(totalItems / limitNumber),
        }
        res.status(200).json({
            message: 'OK',
            users
        })
      break
    }
    case 'POST': {
      const valid = UserService.validateUser(req.body)
      if (!valid) {
        generateInvalidError(res)
        return
      }

      const user = UserService.addUser(req.body)
      res.status(200).json({
        message: user ? 'OK' : 'Client not found',
        user,
      })
      break
    }

    default: {
      res.status(406).json({
        message: 'Method not allowed',
      })
      break
    }
  }
}

export default withAuthController(route)
