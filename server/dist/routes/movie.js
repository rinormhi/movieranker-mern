"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const dotenv_1 = __importDefault(require("dotenv"));
const fetch = require("node-fetch");
dotenv_1.default.config();
router.get(`/details/:MOVIEID`, (req, res) => {
    const MOVIEID = req.params.MOVIEID;
    const url = `https://api.themoviedb.org/3/movie/${MOVIEID}?language=de-DE`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDA3YmZiZmI0NzU1NjUzNjdiMzc5MTA0MTM3MTkyYyIsInN1YiI6IjY1Njg1ZGI2NjgwYmU4MDBhZGI2NjQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f5T0rd1fmYWfYog5LYMuOhIF9tr4aIiXgUP8DEn7SEs'
        }
    };
    fetch(url, options)
        .then((res) => res.json())
        .then((json) => res.send(json))
        .catch((err) => console.error('error:' + err));
});
router.get(`/details/watchproviders/:MOVIEID`, (req, res) => {
    const MOVIEID = req.params.MOVIEID;
    const url = `https://api.themoviedb.org/3/movie/${MOVIEID}/watch/providers`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDA3YmZiZmI0NzU1NjUzNjdiMzc5MTA0MTM3MTkyYyIsInN1YiI6IjY1Njg1ZGI2NjgwYmU4MDBhZGI2NjQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f5T0rd1fmYWfYog5LYMuOhIF9tr4aIiXgUP8DEn7SEs'
        }
    };
    fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
        if (json.results["DE"]) {
            res.send(json.results["DE"]);
        }
        else {
            console.log("No watchprovider for DE");
        }
    })
        .catch((err) => console.error('error:' + err));
});
router.get("/", (req, res) => {
    let with_genres;
    let without_watch_providers;
    let without_genres;
    let with_watch_providers;
    const page = 1;
    const sortby = "popularity.desc";
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=de-DE&page=${page}&sort_by=${sortby}${with_genres ? "&with_genres=" + with_genres : ""}${without_genres ? "&without_genres=" + without_genres : ""}${without_watch_providers ? "&without_watch_providers=" + without_watch_providers : ""}${with_watch_providers ? "&with_watch_providers=" + with_watch_providers : ""}`;
    console.log(url);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDA3YmZiZmI0NzU1NjUzNjdiMzc5MTA0MTM3MTkyYyIsInN1YiI6IjY1Njg1ZGI2NjgwYmU4MDBhZGI2NjQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f5T0rd1fmYWfYog5LYMuOhIF9tr4aIiXgUP8DEn7SEs'
        }
    };
    fetch(url, options)
        .then((res) => res.json())
        .then((json) => { res.send(json); })
        .catch((err) => console.error('error:' + err));
});
router.get("/filter", (req, res) => {
    console.log(req.query);
});
router.get("/loadmore", (req, res) => {
    let with_genres;
    let without_watch_providers;
    let without_genres;
    let with_watch_providers;
    let page = 1;
    let sortby = "popularity.desc";
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=de-DE&page=${page}&sort_by=${sortby}${with_genres ? "&with_genres=" + with_genres : ""}${without_genres ? "&without_genres=" + without_genres : ""}${without_watch_providers ? "&without_watch_providers=" + without_watch_providers : ""}${with_watch_providers ? "&with_watch_providers=" + with_watch_providers : ""}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDA3YmZiZmI0NzU1NjUzNjdiMzc5MTA0MTM3MTkyYyIsInN1YiI6IjY1Njg1ZGI2NjgwYmU4MDBhZGI2NjQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f5T0rd1fmYWfYog5LYMuOhIF9tr4aIiXgUP8DEn7SEs'
        }
    };
    fetch(url, options)
        .then((res) => res.json())
        .then((json) => { res.send(json); })
        .catch((err) => console.error('error:' + err));
});
router.get("/toprated", (req, res) => {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=de-DE&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDA3YmZiZmI0NzU1NjUzNjdiMzc5MTA0MTM3MTkyYyIsInN1YiI6IjY1Njg1ZGI2NjgwYmU4MDBhZGI2NjQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f5T0rd1fmYWfYog5LYMuOhIF9tr4aIiXgUP8DEn7SEs'
        }
    };
    fetch(url, options)
        .then((res) => res.json())
        .then((json) => { res.send(json); })
        .catch((err) => console.error('error:' + err));
});
router.get("/getwatchproviders", (req, res) => {
    const url = 'https://api.themoviedb.org/3/watch/providers/movie?language=de-DE&watch_region=DE';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDA3YmZiZmI0NzU1NjUzNjdiMzc5MTA0MTM3MTkyYyIsInN1YiI6IjY1Njg1ZGI2NjgwYmU4MDBhZGI2NjQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f5T0rd1fmYWfYog5LYMuOhIF9tr4aIiXgUP8DEn7SEs'
        }
    };
    fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
        // Sortiere nach display_priority
        const sortedProviders = json.results.sort((a, b) => a.display_priority - b.display_priority);
        // Extrahiere nur die ersten 20 Ergebnisse
        const slicedProviders = sortedProviders.slice(0, 20);
        // Sende die Daten an den Client
        res.send(slicedProviders);
    })
        .catch((err) => console.error('error:' + err));
});
exports.default = router;
