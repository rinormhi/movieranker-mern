"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("../passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, passport_2.default)();
router.post('/login', (req, res, next) => {
    passport_1.default.authenticate("local", (error, user, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal Server Error', error: info.message });
        }
        if (!user) {
            console.error('Authentication failed:', info);
            return res.status(401).json({ success: false, message: 'Authentication failed', error: info.message });
        }
        req.login(user, (error) => {
            if (error) {
                console.error("req.login()-Error:", error);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
            const secretKey = process.env.JWT_SECRET_KEY;
            if (!secretKey) {
                console.error("JWT_SECRET_KEY is not defined in the environment variables");
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
            const payload = { userId: user._id, username: user.username };
            const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "1h" });
            console.log('Authentication successful');
            res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'none' });
            // res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "none" });
            return res.json({ token, success: true, message: "Authentication successful", user: user });
        });
    })(req, res);
});
router.post("/logout", (req, res, next) => {
    req.session.destroy(function (err) {
        res.clearCookie("jwt");
        res.json({ isAuthenticated: false });
    });
});
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        console.error("JWT_SECRET_KEY is not defined in the environment variables");
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
    jsonwebtoken_1.default.verify(token, secretKey, (error, decoded) => {
        if (error) {
            return res.status(403).json({ success: false, message: 'Forbidden: Invalid token' });
        }
        console.log("Token verified");
        req.user = decoded;
        console.log(req.user);
        next();
    });
};
router.post('/checkauth', authenticateJWT, (req, res) => {
    console.log(req.cookies);
    if (req.cookies.jwt) {
        res.json({ success: true, message: 'Zugriff gewährt', user: req.user });
    }
});
router.get("/fail", () => {
    console.log("fail");
});
exports.default = router;
