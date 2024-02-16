"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const dotenv_1 = __importDefault(require("dotenv"));
const MovieController_1 = __importDefault(require("../controllers/MovieController"));
const fetch = require("node-fetch");
dotenv_1.default.config();
router.get(`/details/:MOVIEID`, MovieController_1.default.getMovieDetails);
router.get(`/details/watchproviders/:MOVIEID`, MovieController_1.default.getWatchProviders);
router.get("/", MovieController_1.default.getMovies);
router.get("/filter", (req, res) => {
    console.log(req.query);
});
exports.default = router;
