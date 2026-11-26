import config from "./config";
import { initDB } from "./db";
import app from "./db/app";

const main = async () => {
    initDB();
    app.listen(config.port, () => {
        console.log(`The server is running on the port ${config.port}`);
    })
};

main()