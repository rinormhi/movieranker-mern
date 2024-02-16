import mongoose, { Document, Schema } from "mongoose";

const genresSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
});

const productionCompaniesSchema = new Schema({
    id: { type: Number, required: true },
    logo_path: { type: String },
    name: { type: String, required: true },
    origin_country: { type: String },
});

const productionCountriesSchema = new Schema({
    iso_3166_1: { type: String, required: true },
    name: { type: String, required: true },
});

const spokenLanguagesSchema = new Schema({
    english_name: { type: String },
    iso_639_1: { type: String },
    name: { type: String },
});

const movieSchema = new Schema({
    adult: { type: Boolean },
    backdrop_path: { type: String },
    belongs_to_collection: { type: String },
    budget: { type: Number },
    genres: [{ type: genresSchema }],
    homepage: { type: String },
    id: { type: Number },
    imdb_id: { type: String },
    original_language: { type: String },
    original_title: { type: String },
    overview: { type: String },
    popularity: { type: Number },
    poster_path: { type: String },
    production_companies: [{ type: productionCompaniesSchema }],
    production_countries: [{ type: productionCountriesSchema }],
    release_date: { type: String },
    revenue: { type: Number },
    runtime: { type: Number },
    spoken_languages: [{ type: spokenLanguagesSchema }],
    status: { type: String },
    tagline: { type: String },
    title: { type: String },
    video: { type: Boolean },
    vote_average: { type: Number },
    vote_count: { type: Number },
});

export interface MovieDocument extends Document {
    adult?: boolean;
    backdrop_path?: string;
    belongs_to_collection?: string;
    budget?: number;
    genres?: { id: number; name: string }[];
    homepage?: string;
    id?: number;
    imdb_id?: string;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: { id: number; logo_path?: string; name: string; origin_country?: string }[];
    production_countries?: { iso_3166_1: string; name: string }[];
    release_date?: string;
    revenue?: number;
    runtime?: number;
    spoken_languages?: { english_name?: string; iso_639_1?: string; name?: string }[];
    status?: string;
    tagline?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}

const Movie = mongoose.model<MovieDocument>("Movie", movieSchema);
export default Movie;
