import express, { type Application, type Request, type Response } from "express";
import { Pool } from "pg"

const app: Application = express();
const port = 5000;

//Middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

//! ToDo
const pool = new Pool({
    connectionString: "postgresql://"
}); //sending creating user response to client

// console.log(pool);

const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255) NOT NULL,
                age INT,
                password VARCHAR(255) NOT NULL,
                is_Active BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
            `)

        console.log("Database Connected Successfully!!")
    } catch (error) {
        console.log(error);
    }
}

initDB();

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

app.post("/api/v1/users", async (req: Request, res: Response) => {
    // console.log(req.body);

    const { name, email, age, password } = req.body;

    res.status(201).json({
        success: true,
        message: "User created successfully!",
        data: { name, email, age }
    });
})

app.listen(port, () => {
    console.log(`The server is running on the port ${port}`);
})