import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/route.js";
import authRouter from "routes/auth.route.js"
import listingRouter from "routes/listing.route.js"
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();

app.listen(3000, () => {
    console.log("The server has started working");

    mongoose.connect(process.env.MONGO).then(() => { console.log("Connected to Database Warehouse PUNE") }).catch((err) => { console.log(err) });
})

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false, statusCode, message,
    })
})