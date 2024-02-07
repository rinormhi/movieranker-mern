import express, { Request, Response } from "express";
const router = express.Router();
import passport from "passport";
import configurePassport from "../passport";
import JWT, { JwtPayload } from 'jsonwebtoken';
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

configurePassport();

router.post('/login', (req: Request, res: Response, next) => {
    passport.authenticate("local", (error: any, user: any, info: any) => {
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
            const token = JWT.sign(payload, secretKey, { expiresIn: "1h" });

            console.log('Authentication successful');
            res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'none' });

            // res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "none" });
            return res.json({ token, success: true, message: "Authentication successful", user: user });
        });
    })(req, res);
});

router.post("/logout", (req: Request, res: Response, next) => {
    req.session.destroy(function (err) {
        res.clearCookie("jwt");
        res.json({ isAuthenticated: false });
    });
});

const authenticateJWT = (req: Request, res: Response, next: any) => {
    const token = req.cookies.jwt;

    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
        console.error("JWT_SECRET_KEY is not defined in the environment variables");
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    JWT.verify(token, secretKey, (error: any, decoded: any) => {
        if (error) {
            return res.status(403).json({ success: false, message: 'Forbidden: Invalid token' });
        }
        console.log("Token verified");

        req.user = decoded;
        console.log(req.user);
        next();
    });
};

router.post('/checkauth', authenticateJWT, (req: Request, res: Response) => {
    console.log(req.cookies);
    if (req.cookies.jwt) {
        res.json({ success: true, message: 'Zugriff gewährt', user: req.user });
    }
});

router.get("/fail", () => {
    console.log("fail");
});

export default router;