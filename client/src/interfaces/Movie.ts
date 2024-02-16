import { Production_Country } from "./Production_Country";
import { Genre } from "./Genre";

export interface Movie {
    backdrop_path: string;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    production_countries: Production_Country[];
    trailer_key?: string
}