import dotenv from "dotenv";
import express, { Request, Response } from "express";
import connectDB from "./config/db";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import movieRouter from "./routes/movie";
import flash from "connect-flash";
import cookieParser from 'cookie-parser';
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

connectDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    secret: 'secrettexthere',
    saveUninitialized: true,
    resave: true,
    // using store session on MongoDB using express-session + connect
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors({
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://movieranker-mern.onrender.com/',
    credentials: true,
}));

// Routes

app.use("/api/users", userRouter);
app.use("/auth", authRouter);
app.use("/api/movies", movieRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.NODE_ENV}-mode on port ${PORT}`);
});