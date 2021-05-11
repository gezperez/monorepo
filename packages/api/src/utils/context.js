import User from '../models/User'
import tokenUtil from './token'

const TOKEN_HEADER_NAME = 'x-token'

const getUser = async req => {
  if (!req) {
    return null
  }
  const tokenHeader = req.get(TOKEN_HEADER_NAME)

  if (!tokenHeader) {
    return null
  }
  try {
    const decodedToken = await tokenUtil.getDecodedToken(tokenHeader)

    return await User.findById(decodedToken.userId)
  } catch (error) {
    return null
  }
}

export default {
  getUser,
}
