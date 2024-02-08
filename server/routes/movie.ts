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

router.get("/popular", (req: Request, res: Response) => {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=de-DE&page=1';
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

export default router;