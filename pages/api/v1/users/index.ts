import type { NextApiRequest, NextApiResponse } from 'next'
import { loggedUser } from '../../../../models/models'
import { withAuthController } from '../../../../controller/withAuthController'
import { generateInvalidError } from '../../../../helpers/errors'
import UserService from '../../../../services/UserService'

interface DataSuccess {
  message: String
  users?: loggedUser[]
  user?: loggedUser
}

interface DataError {
  message: String
}
type Data = DataSuccess | DataError

const route = (req: NextApiRequest, res: NextApiResponse<Data>): void => {
  switch (req.method) {
    case 'GET': {
      const users = UserService.getAllUsers()
      res.status(200).json({
        message: 'OK',
        users,
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
