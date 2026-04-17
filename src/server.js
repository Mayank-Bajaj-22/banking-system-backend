import dotenv from "dotenv";
dotenv.config()

import app from "./app.js";
import connectDB from "./db/connectDB.js";
import { seedUsers } from "./seeds/seedUsers.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT, async () => {
            await seedUsers();
            console.log(`Server running on port: ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(`DB connection failed: ${error.messageclea}`)
    })
