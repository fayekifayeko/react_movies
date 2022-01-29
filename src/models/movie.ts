import { Genre, Theater } from ".";

export interface Movie {
    id: number;
    title: string;
    poster: string;
}

export interface MoviesGenresTheaters {
    genres:Genre[],
    theaters: Theater[]
}