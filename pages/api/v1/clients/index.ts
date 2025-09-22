import type { NextApiRequest, NextApiResponse } from "next"
import { clientType, Paginator } from "../../../../models/models"
import { withAuthController } from "../../../../controller/withAuthController"
import ClientService from "../../../../lib/ClientService"
import { generateInvalidError } from "../../../../helpers/errors"

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
  switch (req.method) {
    case "GET": {
      const { offset = 0, limit = 10, q, searchIn } = req.query
      const offsetNumber = parseInt(offset as string)
      const limitNumber = parseInt(limit as string)
      const searchQuery = (q as string)?.toLowerCase() || ""
      const allClients = ClientService.getAllClients().filter((data) =>
        data.name.toLowerCase().includes(searchQuery)
      )
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
        message: "OK",
        clients,
      })
      break
    }
    case "POST": {
      const valid = ClientService.validateClient(req.body)
      if (!valid) {
        generateInvalidError(res)
        return
      }
      const client = ClientService.addClient(req.body)
      res.status(200).json({
        message: client ? "OK" : "Client not found",
        client,
      })
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
