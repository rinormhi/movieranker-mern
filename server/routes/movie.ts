import express, { Request, Response, json } from "express";
const router = express.Router();
import dotenv from "dotenv";
const fetch = require("node-fetch");

dotenv.config();

router.get(`/details/:MOVIEID`, (req: Request, res: Response) => {
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
        .then((res: Response) => res.json())
        .then((json: any) => res.send(json))
        .catch((err: Error) => console.error('error:' + err));
});

router.get(`/details/watchproviders/:MOVIEID`, (req: Request, res: Response) => {
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
        .then((res: Response) => res.json())
        .then((json: any) => {
            if (json.results["DE"]) {
                res.send(json.results["DE"])
            } else {
                console.log("No watchprovider for DE");
            }
        })
        .catch((err: Error) => console.error('error:' + err));
})

router.get("/", (req: Request, res: Response) => {
    let with_genres;
    let without_watch_providers;
    let without_genres;
    let with_watch_providers;
    const page = 1;
    const sortby = "popularity.desc"
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=de-DE&page=${page}&sort_by=${sortby}${with_genres ? "&with_genres=" + with_genres : ""}${without_genres ? "&without_genres=" + without_genres : ""}${without_watch_providers ? "&without_watch_providers=" + without_watch_providers : ""}${with_watch_providers ? "&with_watch_providers=" + with_watch_providers : ""}`;
    console.log(url);

    const options: RequestInit = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDA3YmZiZmI0NzU1NjUzNjdiMzc5MTA0MTM3MTkyYyIsInN1YiI6IjY1Njg1ZGI2NjgwYmU4MDBhZGI2NjQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f5T0rd1fmYWfYog5LYMuOhIF9tr4aIiXgUP8DEn7SEs'
        }
    };

    fetch(url, options)
        .then((res: Response) => res.json())
        .then((json: any) => { res.send(json) })
        .catch((err: Error) => console.error('error:' + err));
});

router.get("/filter", (req: Request, res: Response) => {
    console.log(req.query);


})

router.get("/loadmore", (req: Request, res: Response) => {
    let with_genres;
    let without_watch_providers;
    let without_genres;
    let with_watch_providers;
    let page = 1;
    let sortby = "popularity.desc"
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=de-DE&page=${page}&sort_by=${sortby}${with_genres ? "&with_genres=" + with_genres : ""}${without_genres ? "&without_genres=" + without_genres : ""}${without_watch_providers ? "&without_watch_providers=" + without_watch_providers : ""}${with_watch_providers ? "&with_watch_providers=" + with_watch_providers : ""}`;

    const options: RequestInit = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDA3YmZiZmI0NzU1NjUzNjdiMzc5MTA0MTM3MTkyYyIsInN1YiI6IjY1Njg1ZGI2NjgwYmU4MDBhZGI2NjQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f5T0rd1fmYWfYog5LYMuOhIF9tr4aIiXgUP8DEn7SEs'
        }
    };

    fetch(url, options)
        .then((res: Response) => res.json())
        .then((json: any) => { res.send(json) })
        .catch((err: Error) => console.error('error:' + err));
});

router.get("/toprated", (req: Request, res: Response) => {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=de-DE&page=1';
    const options: RequestInit = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDA3YmZiZmI0NzU1NjUzNjdiMzc5MTA0MTM3MTkyYyIsInN1YiI6IjY1Njg1ZGI2NjgwYmU4MDBhZGI2NjQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f5T0rd1fmYWfYog5LYMuOhIF9tr4aIiXgUP8DEn7SEs'
        }
    };

    fetch(url, options)
        .then((res: Response) => res.json())
        .then((json: any) => { res.send(json) })
        .catch((err: Error) => console.error('error:' + err));
});

router.get("/getwatchproviders", (req: Request, res: Response) => {
    const url = 'https://api.themoviedb.org/3/watch/providers/movie?language=de-DE&watch_region=DE';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDA3YmZiZmI0NzU1NjUzNjdiMzc5MTA0MTM3MTkyYyIsInN1YiI6IjY1Njg1ZGI2NjgwYmU4MDBhZGI2NjQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f5T0rd1fmYWfYog5LYMuOhIF9tr4aIiXgUP8DEn7SEs'
        }
    };

    fetch(url, options)
        .then((res: Response) => res.json())
        .then((json: any) => {
            // Sortiere nach display_priority
            const sortedProviders = json.results.sort((a: any, b: any) => a.display_priority - b.display_priority);

            // Extrahiere nur die ersten 20 Ergebnisse
            const slicedProviders = sortedProviders.slice(0, 20);

            // Sende die Daten an den Client
            res.send(slicedProviders);
        })
        .catch((err: Error) => console.error('error:' + err));
});

export default router;