import { Request, Response } from "express";
const fetch = require("node-fetch");

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDA3YmZiZmI0NzU1NjUzNjdiMzc5MTA0MTM3MTkyYyIsInN1YiI6IjY1Njg1ZGI2NjgwYmU4MDBhZGI2NjQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f5T0rd1fmYWfYog5LYMuOhIF9tr4aIiXgUP8DEn7SEs'
    }
};

class MovieController {
    // Rufe Informationen über einen ausgewählten Film ab
    async getMovieDetails(req: Request, res: Response) {
        const MOVIEID = req.params.MOVIEID;
        const url = `https://api.themoviedb.org/3/movie/${MOVIEID}?language=de-DE`;

        fetch(url, options)
            .then((res: Response) => res.json())
            .then((json: any) => res.send(json))
            .catch((err: Error) => console.error('error:' + err));
    }

    async getMoviesWatchProviders(req: Request, res: Response) {
        const MOVIEID = req.params.MOVIEID;
        const url = `https://api.themoviedb.org/3/movie/${MOVIEID}/watch/providers`;

        fetch(url, options)
            .then((res: Response) => res.json())
            .then((json: any) => {
                if (json.results["DE"]) {
                    res.send(json.results["DE"]);
                } else {
                    console.log("No watchprovider for DE");
                }
            })
            .catch((err: Error) => console.error('error:' + err));
    }

    async getMoviesTrailer(req: Request, res: Response) {
        const MOVIEID = req.params.MOVIEID;
        const url = `https://api.themoviedb.org/3/movie/${MOVIEID}/videos?language=de-DE`;

        fetch(url, options)
            .then((res: Response) => res.json())
            .then((json: any) => {
                console.log(json);
                res.send(json.results)
            })
            .catch((err: Error) => {
                console.log(err);
            })
    }

    async getMovies(req: Request, res: Response) {
        const filter = req.body.filter;

        const fetchMovies = async (page: number) => {
            let with_genres = filter.genres.map((genre: any) => genre.id).join("%7C");
            let with_watch_providers = filter.watchProviders.map((provider: any) => provider.provider_id).join("%7C");
            let sortby = filter.sortBy;

            let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=de-DE&page=${page}&sort_by=${sortby}&watch_region=DE&vote_count.gte=250`;

            if (with_genres) {
                url += `&with_genres=${with_genres}`;
            }
            if (with_watch_providers) {
                url += `&with_watch_providers=${with_watch_providers}`;
            }

            const response = await fetch(url, options);
            const json = await response.json();
            return json.results;
        };

        const page1Movies = await fetchMovies(filter.page);
        const page2Movies = await fetchMovies(filter.page + 1);

        const combinedMovies = [...page1Movies, ...page2Movies];

        res.send(combinedMovies);
    }

    async loadMoreMovies(req: Request, res: Response) {
        let with_genres = req.body.filter.genres.map((genre: any) => genre.id).join("%7C");
        let with_watch_providers = req.body.filter.watchProviders.map((provider: any) => provider.provider_id).join("%7C");
        let sortby = req.body.filter.sortBy;
        let page = req.body.filter.page;

        let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=de-DE&page=${page}&sort_by=${sortby}&watch_region=DE&vote_count.gte=250`;

        if (with_genres) {
            url += `&with_genres=${with_genres}`;
        }
        // if (with_watch_providers) {
        //     url += `&with_watch_providers=${with_watch_providers}`;
        // }

        fetch(url, options)
            .then((res: Response) => res.json())
            .then((json: any) => {
                res.send(json);
            })
            .catch((err: Error) => console.error('error:' + err));

    }

    async getWatchProviders(req: Request, res: Response) {
        const url = 'https://api.themoviedb.org/3/watch/providers/movie?language=de-DE&watch_region=DE';
        fetch(url, options)
            .then((res: Response) => res.json())
            .then((json: any) => {
                // Sortiere nach display_priority                
                const sortedProviders = json.results.sort((a: any, b: any) => a.display_priority - b.display_priority);
                // Extrahiere nur die ersten 20 Ergebnisse
                const slicedProviders = sortedProviders.slice(0, 40);
                // Sende die Daten an den Client
                res.send(slicedProviders);
            })
            .catch((err: Error) => console.error('error:' + err));
    }

    async getFavoriteMovies(req: Request, res: Response, favoriteMovies: Array<Number>) {
        const fetch = require('node-fetch');
        let movies: any[] = [];

        try {
            await Promise.all(favoriteMovies.map(async (favoriteMovie) => {
                const url = `https://api.themoviedb.org/3/movie/${favoriteMovie}?language=de-DE`;
                const response = await fetch(url, options);
                const json = await response.json();
                movies.push(json);
            }));

            res.status(200).json({ success: true, result: movies })

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }

    }

    async searchMovies(req: Request, res: Response) {

        const query = req.params.QUERY;

        const fetch = require('node-fetch');

        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&vote_count.gte=250`;

        fetch(url, options)
            .then((res: Response) => res.json())
            .then((json: any) => res.status(200).json({ success: true, result: json }))
            .catch((err: Error) => console.error('error:' + err));
    }

    async getPopularMovies(req: Request, res: Response) {
        const url = 'https://api.themoviedb.org/3/movie/popular?language=de-DE&page=1';

        fetch(url, options)
            .then((res: Response) => res.json())
            .then((json: any) => res.status(200).json({ success: true, result: json.results }))
            .catch((err: Error) => console.error('error:' + err));
    }

    async getUpcomingMovies(req: Request, res: Response) {
        const url = 'https://api.themoviedb.org/3/movie/upcoming?language=de-DE&page=1';

        fetch(url, options)
            .then((res: Response) => res.json())
            .then((json: any) => res.status(200).json({ success: true, result: json.results }))
            .catch((err: Error) => console.error('error:' + err));
    }

    async getTopRatedMovies(req: Request, res: Response) {
        const url = 'https://api.themoviedb.org/3/movie/top_rated?language=de-DE&page=1';

        fetch(url, options)
            .then((res: Response) => res.json())
            .then((json: any) => res.status(200).json({ success: true, result: json.results }))
            .catch((err: Error) => console.error('error:' + err));
    }

    async getNowPlayingMovies(req: Request, res: Response) {
        const url = 'https://api.themoviedb.org/3/movie/now_playing?language=de-DE&page=1';

        fetch(url, options)
            .then((res: Response) => res.json())
            .then((json: any) => res.status(200).json({ success: true, result: json.results }))
            .catch((err: Error) => console.error('error:' + err));
    }

    async getAvailableRegions(req: Request, res: Response) {
        const url = 'https://api.themoviedb.org/3/watch/providers/regions?language=de-DE';
        fetch(url, options)
            .then((res: Response) => res.json())
            .then((json: any) => res.status(200).json({ success: true, result: json.results }))
            .catch((err: Error) => console.error('error:' + err));
    }
}

export default new MovieController();
