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
});

// console.log(pool);

const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255) UNIQUE NOT NULL,
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

//Get All Users
app.get("/api/v1/users", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
            SELECT * FROM users
            `);

        res.status(200).json({
            success: true,
            message: "Users retrived successfully.",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        })
    }
})

//Get single user
app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT * FROM users WHERE id=$1 
            `, [id]);

        res.status(200).json({
            success: true,
            message: "User retrived successfully.",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        })
    }
})

//Create Users
app.post("/api/v1/users", async (req: Request, res: Response) => {
    try {
        // console.log(req.body);

        const { name, email, age, password } = req.body;

        const result = await pool.query(`
            INSERT INTO users (name, email, age, password) VALUES ($1, $2, $3, $4) RETURNING *
        ` , [name, email, age, password]);

        console.log(result.rows);

        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: result.rows
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        });
    }
})

//Update User
app.put("/api/v1/users/:id", async (req: Request, res: Response) => {

    try {
        const {id} = req.params;
        const { name, age, password, is_Active } = req.body;

        const result = await pool.query(`
            UPDATE users
            SET
            name = COALESCE($1, name),
            age = COALESCE($2, age),
            password = COALESCE($3, password),
            is_Active = COALESCE($4, is_Active),
            updated_at = NOW()

            WHERE id=$5 RETURNING *
            `, [name ?? null, age ?? null, password ?? null, is_Active ?? null, id])

        res.status(200).json({
            success: true,
            message: "User data updated successfully!",
            data: result.rows[0]
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        });
    }
})

app.listen(port, () => {
    console.log(`The server is running on the port ${port}`);
})