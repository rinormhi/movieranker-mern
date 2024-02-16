export interface User {
    _id: string;
    fname: string;
    lname: string;
    username: string;
    email: string;
    password: string;
    registrationSucceed: boolean;
    favoriteMovies: number[];
}