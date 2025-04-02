import { env } from "@/configs"
import jwt from "jsonwebtoken"

export const generateToken = (type: string, userId: string) => {
  if (type === "token") {
    return jwt.sign({ userId }, env.APP.JWT_SECRET, {
      expiresIn: env.APP.JWT_EXPIRES_IN,
    })
  }
  return jwt.sign({ userId }, env.APP.JWT_REFRESH_SECRET, {
    expiresIn: env.APP.JWT_REFRESH_EXPIRES_IN,
  })
}

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret)
}
