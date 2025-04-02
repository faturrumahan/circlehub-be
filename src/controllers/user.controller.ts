import { SUser } from "@/services";
import { formatResponse } from "@/utils"
import { NextFunction, Request, Response } from "express"

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await SUser.getAllUsers()
      res.json(formatResponse("T", "Get All User Success", users))
    } catch (error) {
      next(error)
    }
  }
  
  const getSpesificUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, name, role } = req.params
      const users = await SUser.getSpecificUsers(id, name, role as 'ADMIN' | 'USER')
      res.json(formatResponse("T", "Get User Success", users))
    } catch (error) {
      next(error)
    }
  }

  const CUser = {
    getAllUsers,
    getSpesificUsers,
  }
  
  export default CUser