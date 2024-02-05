import express from "express";
import UserController from "../controllers/UserController";
const router = express.Router();

const uc = new UserController();

router.post("/register", (req, res) => {
    uc.create(req, res);
});

router.post("/local", (req, res) => {
    console.log("LOCAL");

});

export default router;
