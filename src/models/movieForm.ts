import { ActorTypeAhead } from ".";

export interface MovieForm {
    title: string;
    poster?: string;
    inTheaters: boolean;
    posterUrl?: string;
    releaseDate?: Date;
    trailer?: string;
    genresIds?: number[];
    theatersIds?:  number[];
    actors?: ActorTypeAhead[];
    summary?: string;
}