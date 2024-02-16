import express from "express";
import UserController from "../controllers/UserController";
import mongoose, { ObjectId } from "mongoose";
import MovieController from "../controllers/MovieController";
const router = express.Router();

const uc = new UserController();

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
    console.log(typeof(favoriteMovies));
    MovieController.getFavoriteMovies(req, res, favoriteMovies);    
    
});

export default router;
