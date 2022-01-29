import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Loader } from "react-bootstrap-typeahead";
import { MovieForm } from ".";
import { moviesApiUrl } from "../endpoints";
import { Genre, MoviesGenresTheaters, Theater } from "../models";

export default function CreateMovie () {

  const [nonSelectedGenres, setNonSelectedGenres] = useState<Genre[]>([]);
  const [nonSelectedTheaters, setNonSelectedTheaters] = useState<Theater[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {

    axios(`${moviesApiUrl}/PostGet`)
    .then((resp: AxiosResponse<MoviesGenresTheaters>) => {

      setNonSelectedGenres(resp.data.genres);

      setNonSelectedTheaters(resp.data.theaters);

      setIsLoading(false);
    })

  }, []);


    return (
        <>
        <h1>Create Movie</h1>
        {isLoading ? <Loader /> : 
        <MovieForm
          model={{title: '', inTheaters: false, actors: []}}
          onSubmit={async values => {
            await new Promise(r => setTimeout(r, 3000));
            console.log(values);
        }}
        selectedGenres={[]}
        nonSelectedGenres={nonSelectedGenres}
        selectedTheaters={[]}
        nonSelectedTheaters={nonSelectedTheaters}
        selectedActors={[]}
          />}
        </>
    );
}