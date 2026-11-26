import express, { type Application, type Request, type Response } from "express";
import { pool } from "./db";
import { userRoute } from "./modules/users/user.route";


const app: Application = express();

//Middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


//Get All Users
app.use("/api/v1/users", userRoute);

//Get single user
app.use("api/v1/users/:id", userRoute)

//Create Users
app.use("/api/v1/users", userRoute)

//Update User
app.use("/api/v1/users/:id", userRoute)

//Delete User
app.use("/api/v1/users/:id", userRoute);

//Root route
app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is root route.",
        author: "pgrmrmortuja"
    })
})

export default app