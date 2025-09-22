import { generateUnauthorizedError } from "../helpers/errors"
import authServiceSingleton from "../lib/AuthService"
import { NextApiRequest, NextApiResponse } from "next"

export const withAuthController = (controller: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const authorization = req.headers.authorization || ""
    const token = authorization?.split(" ")[1]

    const validJWT = authServiceSingleton.checkIfAccessTokenIsValid(token)
    if (validJWT) {
      return await controller(req, res)
    } else {
      generateUnauthorizedError(res as NextApiResponse<{ message: string }>)
    }
  }
}
