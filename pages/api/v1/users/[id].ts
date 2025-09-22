import type { NextApiRequest, NextApiResponse } from "next"
import { withAuthController } from "../../../../controller/withAuthController"
import { generateInvalidError } from "../../../../helpers/errors"
import UserService from "../../../../lib/UserService"
import { loggedUser } from "../../../../models/models"

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
  const userId = req.query.id as string

  switch (req.method) {
    case "GET": {
      if (userId) {
        const user = UserService.getAllUsers().find(
          (user) => user.id === req.query.id
        )
        if (user) {
          res.status(200).json({
            message: "OK",
            user,
          })
        } else {
          res.status(404).json({
            message: "User not found",
          })
        }
      }
      break
    }

    case "PUT": {
      const valid = UserService.validateUser(req.body)
      if (!valid) {
        generateInvalidError(res)
        res.status(400).json({
          message: "Invalid user data",
        })
        return
      }

      const updatedUser = UserService.updateUser(req.body, {
        where: (user: loggedUser) => user.id === req.body.id,
      })
      if (updatedUser) {
        res.status(200).json({
          message: "User updated successfully",
          user: updatedUser,
        })
      } else {
        res.status(404).json({
          message: "User not found",
        })
      }
      break
    }

    case "DELETE": {
      if (!userId) {
        res.status(400).json({
          message: "Invalid user ID",
        })
        return
      }

      const deletedUser = UserService.deleteUser(userId)
      if (deletedUser) {
        res.status(200).json({
          message: "User deleted successfully",
          user: deletedUser,
        })
      } else {
        res.status(404).json({
          message: "User not found",
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
