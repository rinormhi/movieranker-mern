export interface Filter {
    genres: Genre[];
    watchProviders: WatchProvider[];
    sortBy: string;
    page: number
    // period: Period;
    // vote_average: VoteAverage
}

interface Genre {
    id: string;
    name: string;
}

interface WatchProvider {
    display_priority: number;
    logo_path: string;
    provider_name: string;
    provider_id: number;
}

interface Period {
    minYear: number;
    maxYear: number;
}

interface VoteAverage {
    minVote: number;
    maxVote: number;
}

interface Runtime {
    minMinutes: number;
    maxMinutes: number;
} 

interface MonetizationType {
    monetizationType: string;
}