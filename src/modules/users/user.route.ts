import { Router } from "express";
import { userController } from "./user.controller";

//route = sub router, app = main router
const route = Router();

//get all user
route.get("/", userController.getAllUsers);

//get single user
route.get("/:id", userController.getSingleUser)

//create user
route.post("/", userController.createUser);

//update user

//delete user

export const userRoute = route;