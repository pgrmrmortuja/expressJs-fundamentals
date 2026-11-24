import express, {type Application, type Request, type Response } from "express";
import {Pool} from "pg"

const app: Application = express();
const port = 5000;

//Middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

const pool = new Pool({
    connectionString: "postgresql://"
})

// console.log(pool); //express and postgress serverless platfrom neon connect with pg

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

app.post("/", async (req: Request, res: Response) => {
    // console.log(req.body);

    const {name, age, password} = req.body;

    res.status(201).json({
        success: true,
        message: "This is test post api.",
        data: {name, age}
    });
})

app.listen(port, () => {
    console.log(`The server is running on the port ${port}`);
})