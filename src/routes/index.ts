import { Router } from "express"
import userRouter from "@/routes/user.routes"
import {authMiddleware} from "@/middlewares"

const router = Router()

router.use("/user", userRouter)

export default router
