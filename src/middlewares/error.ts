import { loggerWinston } from "@/configs"
import { CustomError, formatResponse } from "@/utils"
import { Request, Response, NextFunction } from "express"

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  loggerWinston.error(message)
  res.status(statusCode).json(formatResponse("F", message, null))
}

export default errorHandler
