export interface MovieForm {
    title: string;
    poster?: File;
    inTheaters: boolean;
    posterUrl?: string;
    releaseDate?: Date;
    trailer?: string;
}