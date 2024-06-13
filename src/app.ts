import express from "express";
import toDoRoutes  from "./routes/contactRoutes";
const cors = require('cors')
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());

app.use('/api',toDoRoutes)

// server port
app.listen(port, () => {
    console.log("server is running on",port);
})

export {app};