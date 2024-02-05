import express from "express";
const router = express.Router();
import passport from "passport";
import configurePassport from "../passport";
import JWT from 'jsonwebtoken';
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

configurePassport();

router.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error', error: info.message });
        }
        if (!user) {
            console.error('Authentication failed:', info);
            return res.status(401).json({ success: false, message: 'Authentication failed', error: info.message });
        }
        req.login(user, (err) => {
            if (err) {
                console.error("req.login()-Error:", err);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }

            const secretKey = process.env.JWT_SECRET_KEY;

            if (!secretKey) {
                console.error("JWT_SECRET_KEY is not defined in the environment variables");
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
            
            const payload = { userId: user._id, username: user.username };
            const token = JWT.sign(payload, secretKey, { expiresIn: "1h" });

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

    // if (!token) {
    //     return res.status(401).json({ success: false, message: "Unauthorized. No token provided." });
    // }

    JWT.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
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


export default router;
