import { Router } from "express";
import { profileController } from "./profile.controller";

//route = sub router, app = main router
const route = Router();

//get all profile


//get single profile


//create profile
route.post("/", profileController.createProfile);

//update profile


//delete profile


export const profileRoute = route;