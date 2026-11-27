import express, { type Application, type Request, type Response } from "express";
import { userRoute } from "./modules/users/user.route";
import { profileRoute } from "./modules/profile/profile.route";


const app: Application = express();

//Middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


//Get
app.use("/api/v1/users", userRoute);

//Get 
app.use("/api/v1/users/:id", userRoute)

//Create 
app.use("/api/v1/users", userRoute);
app.use("/api/v1/profiles", profileRoute);

//Update 
app.use("/api/v1/users/:id", userRoute)

//Delete 
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