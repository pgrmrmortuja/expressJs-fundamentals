import express, { urlencoded, type Application, type Request, type Response } from "express";
const app: Application = express();
const port = 5000;

//Middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));


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
})

app.listen(port, () => {
    console.log(`The server is running on the port ${port}`);
})