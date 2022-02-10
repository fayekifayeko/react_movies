import { LandingPage, CreateMovie, EditMovie, FilterMovies, MovieDetails } from "./movies";
import { Genres, CreateGenre, EditGenre } from "./genres";
import { Actors, CreateActor, EditActor } from "./actors";
import { Theaters, CreateTheater, EditTheater } from "./theaters";
import RedirectToLandingPage from "./shared/redirectToLandingPage";
import { Login, Register, Users } from "./auth";

const routes = [
    {path: '/', component: LandingPage, exact: true},
    {path: '/movies/create', component: CreateMovie, isAdmin: true},
    {path: '/movies/edit/:id(\\d+)', component: EditMovie, isAdmin: true},
    {path: '/movies/filter', component: FilterMovies},
    {path: '/movies/:id(\\d+)', component: MovieDetails},


    {path: '/genres', component: Genres, exact: true, isAdmin: true},
    {path: '/genres/create', component: CreateGenre, isAdmin: true},
    {path: '/genres/edit/:id(\\d+)', component: EditGenre, isAdmin: true},

    {path: '/actors', component: Actors, exact: true, isAdmin: true},
    {path: '/actors/create', component: CreateActor, isAdmin: true},
    {path: '/actors/edit/:id(\\d+)', component: EditActor, isAdmin: true},

    {path: '/theaters', component: Theaters, exact: true, isAdmin: true},
    {path: '/theaters/create', component: CreateTheater, isAdmin: true},
    {path: '/theaters/edit/:id(\\d+)', component: EditTheater, isAdmin: true},

    {path: '/register', component: Register},
    {path: '/login', component: Login},
    {path: '/users', component: Users, exact: true, isAdmin: true},


    {path: "*", component: RedirectToLandingPage}

];

export default routes;