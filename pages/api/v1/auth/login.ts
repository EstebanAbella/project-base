import type { NextApiRequest, NextApiResponse } from "next"

import { loggedUser } from "../../../../models/models"
import UserService from "../../../../lib/UserService"
import authServiceSingleton from "../../../../lib/AuthService"
import { JwtPayload } from "jsonwebtoken"

interface DataSuccess {
  message: String
  user: loggedUser
  validatedToken?: string | false | null | JwtPayload
}

interface DataError {
  message: String
}

type Data = DataSuccess | DataError

const route = (req: NextApiRequest, res: NextApiResponse<Data>): void => {
  switch (req.method) {
    case "POST": {
      const { email, password } = req.body
      const user = UserService.login(email, password)
      if (!user) {
        res.status(401).json({
          message: "Unauthorized",
        })
        return
      }
      res.status(200).json({
        message: "OK",
        user,
      })
      break
    }
    case "GET": {
      const token = req.query.token
      if (!token || typeof token !== "string") {
        res.status(401).json({
          message: "Unauthorized",
        })
        return
      }
      const validatedToken =
        authServiceSingleton.checkIfAccessTokenIsValid(token)
      if (!validatedToken) {
        res.status(401).json({
          message: "Unauthorized",
        })
        return
      }
      //
      if (typeof validatedToken === "object" && "id" in validatedToken) {
        const userId = (validatedToken as JwtPayload).id
        if (!userId) {
          res.status(400).json({
            message: "Invalid token structure",
          })
          return
        }
        const user = UserService.getAllUsers().find(
          (user) => user.id === userId.toString()
        )
        if (!user) {
          res.status(404).json({
            message: "User not found",
          })
          return
        }
        res.status(200).json({
          message: "OK",
          user,
        })
      }
      //
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

export default route
