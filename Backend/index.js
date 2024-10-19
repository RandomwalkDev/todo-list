import express from 'express'
import { config } from 'dotenv'
config();
import cors from "cors"
import dbConnect from './config/dbConnect.js';
import TodoRouter from './routes/todoRoutes.js'


const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json());

// routes
app.use('/api/todo', TodoRouter);


// server
dbConnect().then((err) => {
    if (err) throw err;
    console.log(`Server running at PORT : ${PORT}`);
}).catch((error) => {
    console.log("Error! Cannot start server : ", error);
})

// custom error middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error'

    return res.status(errorStatus).json({
        success: false,
        message : errorMessage
    })
})