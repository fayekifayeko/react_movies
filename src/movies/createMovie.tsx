import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MovieForm } from ".";
import { moviesApiUrl } from "../endpoints";
import { Genre, MovieForm as MovieFormModel, MoviesGenresTheaters, Theater } from "../models";
import { DisplayErrors, Loader } from "../shared";
import { convertMovieToFormData } from "../utils/convertMovieToFormData";

export default function CreateMovie () {

  const [nonSelectedGenres, setNonSelectedGenres] = useState<Genre[]>([]);
  const [nonSelectedTheaters, setNonSelectedTheaters] = useState<Theater[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string []>([]);
  const history = useHistory();

  async function create(movie: MovieFormModel){
    try {

      console.log('hiiiiiiiii', movie);

      const formData = convertMovieToFormData(movie);
      const resp = await axios({
        url: `${moviesApiUrl}`,
        method: 'post',
        data: formData,
        headers: {'Content-Type': 'multipart-formdata'}
      });

      history.push(`/movie/${resp.data}`)

      
    }catch(err) {
      setErrors(err.response.data);
    }
  }


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
        <DisplayErrors errors={errors} />
        {isLoading ? <Loader /> : 
        <MovieForm
          model={{title: '', inTheaters: false, actors: []}}
          onSubmit={async values => {
            await create(values);
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