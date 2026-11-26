import express, { type Application, type Request, type Response } from "express";
import { pool } from "./db";
import { userRoute } from "./modules/users/user.route";


const app: Application = express();

//Middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// const pool = new Pool({
//     connectionString: config.connection_string
// });

// const initDB = async () => {
//     try {
//         await pool.query(`
//             CREATE TABLE IF NOT EXISTS users(
//                 id SERIAL PRIMARY KEY,
//                 name VARCHAR(255),
//                 email VARCHAR(255) UNIQUE NOT NULL,
//                 age INT,
//                 password VARCHAR(255) NOT NULL,
//                 is_Active BOOLEAN DEFAULT true,
//                 created_at TIMESTAMP DEFAULT NOW(),
//                 updated_at TIMESTAMP DEFAULT NOW()
//             );
//             `)

//         console.log("Database Connected Successfully!!")
//     } catch (error) {
//         console.log(error);
//     }
// }

// initDB();

// app.get("/", (req, res) => {
//     res.send("Express Server Created.");
// })

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is Express server root route.",
        author: "pgrmrmortuja"
    })
})

//Get All Users
app.use("/api/v1/users", userRoute);

//Get single user
app.use("api/v1/users/:id", userRoute)

//Create Users
app.use("/api/v1/users", userRoute)

//Update User
app.use("/api/v1/users/:id", userRoute)

//Delete User
app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const result = await pool.query(`
            DELETE FROM users WHERE id=$1
            `, [id])

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        });
    }
})

// app.listen(config.port, () => {
//     console.log(`The server is running on the port ${config.port}`);
// })

export default app