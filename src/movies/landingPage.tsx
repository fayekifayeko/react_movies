import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { MoviesList } from ".";
import loadDataContext from "../context/loadDataContext";
import { moviesApiUrl } from "../endpoints";
import { LandingPage as  LandingPageModel} from '../models';

export default function LandingPage () {
    const [movies, setMovies] = useState<LandingPageModel>({});

useEffect(() => {
  loadData();
}, [])
  
function loadData() {
  axios.get(`${moviesApiUrl}/LandingPage`)
  .then((resp: AxiosResponse<LandingPageModel>) => {
    setMovies(resp.data);
  })
}
    return (
        <loadDataContext.Provider value={loadData} >
        <h1>In Theaters Movies</h1>
        <MoviesList movies={movies.inTheaters}/>
      
        <h1>Upcoming Movies</h1>
        <MoviesList movies={movies.upcomingReleases}/>
        </loadDataContext.Provider>
    );
}