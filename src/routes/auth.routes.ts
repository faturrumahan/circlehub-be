import { CAuth } from "@/controllers"
import { Router } from "express"
import { authMiddleware } from '@/middlewares';

const router = Router()

router.post("/login", CAuth.login)
router.post("/relogin", CAuth.reLogin)
router.post("/register", CAuth.register)
router.post("/logout", authMiddleware, CAuth.logout)

export default router