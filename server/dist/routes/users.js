"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const MovieController_1 = __importDefault(require("../controllers/MovieController"));
const router = express_1.default.Router();
const uc = new UserController_1.default();
router.post("/register", (req, res) => {
    uc.create(req, res);
});
router.post("/local", (req, res) => {
    console.log("LOCAL");
});
router.get("/addtofavorites/:movieId", (req, res) => {
    const movieId = req.params.movieId;
    uc.addToFavorites(req, res, movieId);
    res.send("");
});
router.post("/getFavorites/", (req, res) => {
    const favoriteMovies = req.body.favoriteMovies;
    console.log(favoriteMovies);
    console.log(typeof (favoriteMovies));
    MovieController_1.default.getFavoriteMovies(req, res, favoriteMovies);
});
exports.default = router;
