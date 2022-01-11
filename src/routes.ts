import { LandingPage, CreateMovie, EditMovie, FilterMovies } from "./movies";
import { Genres, CreateGenre, EditGenre } from "./genres";
import { Actors, CreateActor, EditActor } from "./actors";
import { Theaters, CreateTheater, EditTheater } from "./theaters";
import RedirectToLandingPage from "./shared/redirectToLandingPage";

const routes = [
    {path: '/', component: LandingPage, exact: true},
    {path: '/movies/create', component: CreateMovie},
    {path: '/movies/edit/:id(\\d+)', component: EditMovie},
    {path: '/movies/filter', component: FilterMovies},

    {path: '/genres', component: Genres, exact: true},
    {path: '/genres/create', component: CreateGenre},
    {path: '/genres/edit/:id(\\d+)', component: EditGenre},

    {path: '/actors', component: Actors, exact: true},
    {path: '/actors/create', component: CreateActor},
    {path: '/actors/edit/:id(\\d+)', component: EditActor},

    {path: '/theaters', component: Theaters, exact: true},
    {path: '/theaters/create', component: CreateTheater},
    {path: '/theaters/edit/:id(\\d+)', component: EditTheater},

    {path: "*", component: RedirectToLandingPage}

];

export default routes;