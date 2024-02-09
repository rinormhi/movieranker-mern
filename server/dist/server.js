"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const movie_1 = __importDefault(require("./routes/movie"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
(0, db_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.MONGO_URI
    }),
    secret: 'secrettexthere',
    saveUninitialized: true,
    resave: true,
    // using store session on MongoDB using express-session + connect
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, connect_flash_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.FRONTEND_URL_PROD,
    credentials: true,
}));
// Routes
app.get("/", (req, res) => {
    res.send("Hi");
});
app.use("/api/users", users_1.default);
app.use("/auth", auth_1.default);
app.use("/api/movies", movie_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.NODE_ENV}-mode on port ${PORT}!`);
});
