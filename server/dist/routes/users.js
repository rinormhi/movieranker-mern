"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = express_1.default.Router();
const uc = new UserController_1.default();
router.post("/register", (req, res) => {
    uc.create(req, res);
});
router.post("/local", (req, res) => {
    console.log("LOCAL");
});
exports.default = router;
