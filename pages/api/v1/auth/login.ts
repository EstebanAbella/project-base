import type { NextApiRequest, NextApiResponse } from 'next'

import { loggedUser } from '../../../../models/models'
import UserService from '../../../../services/UserService'
import authServiceSingleton from '../../../../services/AuthService'
import { JwtPayload } from 'jsonwebtoken'

interface DataSuccess {
  message: String
  user: loggedUser
  validatedToken?: string | false | null | JwtPayload
}

interface DataError {
  message: String
}

type Data = DataSuccess | DataError

export default (req: NextApiRequest, res: NextApiResponse<Data>): void => {
  switch (req.method) {
    case 'POST': {
      const { email, password } = req.body
      const user = UserService.login(email, password)
      if (!user) {
        res.status(401).json({
          message: 'Unauthorized',
        })
        return
      }
      res.status(200).json({
        message: 'OK',
        user,
      })
      break
    }
    case 'GET': {
      const token = req.query.token
      if (!token || typeof token !== 'string') {
        res.status(401).json({
          message: 'Unauthorized',
        })
        return
      }
      const validatedToken =
        authServiceSingleton.checkIfAccessTokenIsValid(token)
      if (!validatedToken) {
        res.status(401).json({
          message: 'Unauthorized',
        })
        return
      }
      res.status(200).json({
        message: 'OK',
        validatedToken,
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
