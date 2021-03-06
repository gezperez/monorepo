import jwt from 'jsonwebtoken'

import config from '../config'

const create = userId =>
  new Promise((resolve, reject) => {
    jwt.sign(
      {
        userId,
      },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_LIFE_TIME,
      },
      (error, token) => {
        if (error) {
          return reject(error)
        }

        return resolve(token)
      }
    )
  })

const getDecodedToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        return reject(error)
      }
      if (!decodedToken.exp || !decodedToken.iat) {
        return reject(new Error("Token had no 'exp' or 'iat' payload"))
      }

      return resolve(decodedToken)
    })
  })

export default {
  create,
  getDecodedToken,
}
