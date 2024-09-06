import type { NextApiRequest, NextApiResponse } from 'next'
import { withAuthController } from '../../../../controller/withAuthController'
import { generateInvalidError } from '../../../../helpers/errors'
import { clientType } from '../../../../models/models'
import ClientService from '../../../../services/ClientService'
import UserService from '../../../../services/UserService'


interface DataSuccess {
  message: String
  clients?: clientType[],
  client?: clientType
}

interface DataError {
  message: String
}
type Data = DataSuccess | DataError

const route = (req: NextApiRequest, res: NextApiResponse<Data>): void => {
  const userId = req.query.id as string

  switch (req.method) {
    case 'GET': {
      if (userId) {
        const user = UserService.getAllUsers().find(
          (user) => user.id === req.query.id
        )

        if(!user) {
          res.status(404).json({
            message: 'User not found',
          })
          return
        }


        if(user?.role === 'admin') {
          const clients = ClientService.getAllClients();
          res.status(200).json({
              message: 'OK',
              clients
          })
        } else {
            const clients = ClientService.getAllClients().filter(clients => clients.userId === req.query.id)
            if (clients) {
              res.status(200).json({
                message: (clients) ? 'OK' : 'Clients not found',
                clients
              })
            } else {
              res.status(404).json({
                message: 'client not found',
              })
            }
          }
      }
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
