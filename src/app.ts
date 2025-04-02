import express, { NextFunction, Request, Response } from "express"
import logger from "morgan"
import { env, loggerWinston } from "./configs"
// import coreRouter from "./routes"
import { errorHandler } from "./middlewares"
// import { deleteCache, schedule } from "./schedulers"
import { formatResponse } from "./utils"

const app = express()

app.use(logger("dev"))
app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {
  loggerWinston.info(`[WINSTON] Request - ${req.method} - ${req.url}`)
  next()
})

app.use(errorHandler)

app.listen(env.APP.PORT, () => {
    console.log(`[Server] - Listening on port ${env.APP.PORT}`)
  })