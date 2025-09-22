import type { NextApiRequest, NextApiResponse } from "next"
import { withAuthController } from "../../../../controller/withAuthController"
import { generateInvalidError } from "../../../../helpers/errors"
import { clientType, Paginator } from "../../../../models/models"
import ClientService from "../../../../lib/ClientService"
import UserService from "../../../../lib/UserService"

interface DataSuccess {
  message: String
  clients?: Paginator<clientType>
  client?: clientType
}

interface DataError {
  message: String
}
type Data = DataSuccess | DataError

const route = (req: NextApiRequest, res: NextApiResponse<Data>): void => {
  const userId = req.query.id as string

  switch (req.method) {
    case "GET": {
      if (userId) {
        const user = UserService.getAllUsers().find(
          (user) => user.id === req.query.id
        )

        if (!user) {
          res.status(404).json({ message: "User not found" })
          return
        }

        const { offset = 0, limit = 10, q, searchIn } = req.query
        const offsetNumber = parseInt(offset as string)
        const limitNumber = parseInt(limit as string)
        const searchQuery = (q as string)?.toLowerCase() || ""

        let allClients = ClientService.getAllClients()

        if (user.role !== "admin") {
          allClients = allClients.filter((client) => client.userId === user.id)
        }

        if (searchQuery) {
          allClients = allClients.filter((data) => {
            if (searchIn) {
              const field = searchIn as keyof typeof data
              const value = data[field]
              return value
                ? value.toString().toLowerCase().includes(searchQuery)
                : false
            } else {
              return Object.values(data).some((value) =>
                value
                  ? value.toString().toLowerCase().includes(searchQuery)
                  : false
              )
            }
          })
        }

        const paginatedClients = allClients.slice(
          offsetNumber,
          offsetNumber + limitNumber
        )

        const totalItems = allClients.length
        const clients: Paginator<clientType> = {
          items: paginatedClients,
          count: totalItems,
          actualPage: Math.ceil(offsetNumber / limitNumber) + 1,
          pages: Math.ceil(totalItems / limitNumber),
        }

        res.status(200).json({
          message: clients.items.length ? "OK" : "Clients not found",
          clients,
        })
      }
      break
    }

    default: {
      res.status(406).json({
        message: "Method not allowed",
      })
      break
    }
  }
}

export default withAuthController(route)
