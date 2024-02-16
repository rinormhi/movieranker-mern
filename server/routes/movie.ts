import express, { Request, Response, json } from "express";
const router = express.Router();
import dotenv from "dotenv";
import MovieController from "../controllers/MovieController";
const fetch = require("node-fetch");

dotenv.config();

router.get(`/details/:MOVIEID`, MovieController.getMovieDetails);
router.get(`/details/watchproviders/:MOVIEID`, MovieController.getMoviesWatchProviders);
router.get(`/details/trailer/:MOVIEID`, MovieController.getMoviesTrailer);
router.post("/", MovieController.getMovies);
router.post("/loadmore", MovieController.loadMoreMovies);
router.get("/search/:QUERY", MovieController.searchMovies);
router.get("/popularmovies", MovieController.getPopularMovies);
router.get("/upcoming", MovieController.getUpcomingMovies);
router.get("/toprated", MovieController.getTopRatedMovies);
router.get("/nowplaying", MovieController.getNowPlayingMovies);
router.get("/watchproviders", MovieController.getWatchProviders);
router.get("/available_regions", MovieController.getAvailableRegions);

router.get("/filter", (req: Request, res: Response) => {
    console.log(req.query);
});

export default router;