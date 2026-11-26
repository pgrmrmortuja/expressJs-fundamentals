import { Router } from "express";
import { userController } from "./user.controller";

//route = sub router, app = main router
const route = Router();

//get all user
route.get("/", userController.getAllUsers);

//get single user
route.get("/:id", userController.getSingleUser);

//create user
route.post("/", userController.createUser);

//update user
route.put("/:id", userController.updateUser);

//delete user
route.delete("/:id", userController.deleteUser);

export const userRoute = route;