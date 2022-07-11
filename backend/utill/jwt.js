import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

const decodeToken = (token) => {
  return jwt.decode(token)
}

export { generateToken, verifyToken, decodeToken }
