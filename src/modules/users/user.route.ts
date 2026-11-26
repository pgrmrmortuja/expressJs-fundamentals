import { Router} from "express";
import { userController } from "./user.controller";

//route = sub router, app = main router
const route = Router();

//get all user
route.get("/", userController.getAllUsers);

//create user
route.post("/", userController.createUser);

export const userRoute = route;