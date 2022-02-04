export interface MoviesFilter {
    genreId: number;
    title: string;
    upcomingReleases: boolean;
    inTheaters: boolean;
    page: number;
    recordPerPage: number;
}