import dotenv from "dotenv";
import express, { Request, Response } from "express";
import connectDB from "./config/db";
import colors from "colors";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import flash from "connect-flash";
import cookieParser from 'cookie-parser';
// TEST

import passport from "passport";

const app = express();

dotenv.config();

connectDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

import session from "express-session";
app.use(session({
    secret: 'secrettexthere',
    saveUninitialized: true,
    resave: true,
    // using store session on MongoDB using express-session + connect
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

// Routes

app.use("/api/users", userRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.NODE_ENV}-mode on port ${process.env.PORT}`.bgBlack.yellow.bold);
});