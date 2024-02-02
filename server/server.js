const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const flash = require("connect-flash");
const cookieParser = require('cookie-parser');
// TEST

const passport = require("passport");

const app = express();

dotenv.config();

connectDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

const session = require("express-session");
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
    console.log(`Server is running on ${process.env.NODE_ENV}-mode on port ${process.env.PORT}`.yellow.bold);
});
