import type { NextApiRequest, NextApiResponse } from "next"
import { withAuthController } from "../../../../controller/withAuthController"
import { generateInvalidError } from "../../../../helpers/errors"
import { clientType } from "../../../../models/models"
import ClientService from "../../../../lib/ClientService"

interface DataSuccess {
  message: String
  clients?: clientType[]
  client?: clientType
}

interface DataError {
  message: String
}
type Data = DataSuccess | DataError

const route = (req: NextApiRequest, res: NextApiResponse<Data>): void => {
  const clientId = req.query.id as string

  switch (req.method) {
    case "GET": {
      if (clientId) {
        const client = ClientService.getAllClients().find(
          (client) => client.id === req.query.id
        )
        if (client) {
          res.status(200).json({
            message: client ? "OK" : "Client not found",
            client,
          })
        } else {
          res.status(404).json({
            message: "client not found",
          })
        }
      }
      break
    }

    case "PUT": {
      const valid = ClientService.validateClient(req.body)
      if (!valid) {
        generateInvalidError(res)
        res.status(400).json({
          message: "Invalid client data",
        })
        return
      }

      const updatedClient = ClientService.updateClient(req.body, {
        where: (client: clientType) => client.id === req.body.id,
      })
      if (updatedClient) {
        res.status(200).json({
          message: "client updated successfully",
          client: updatedClient,
        })
      } else {
        res.status(404).json({
          message: "client not found",
        })
      }
      break
    }

    case "DELETE": {
      if (!clientId) {
        res.status(400).json({
          message: "Invalid client ID",
        })
        return
      }

      const deletedClient = ClientService.deleteClient(clientId)
      if (deletedClient) {
        res.status(200).json({
          message: "client deleted successfully",
          client: deletedClient,
        })
      } else {
        res.status(404).json({
          message: "client not found",
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
