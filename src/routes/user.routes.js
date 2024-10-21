import { Router } from "express";
import { userRegister } from "../controllers/user.controllers.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { upload } from "../middlewares/multer.middlewares.js";

const userRouter = Router()

userRouter.route("/register").post( upload.single("avatar"), asyncHandler (async (req,res) => {
    userRegister(req,res)
}))

export {userRouter}