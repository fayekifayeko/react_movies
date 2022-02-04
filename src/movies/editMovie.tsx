
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { MovieForm } from ".";
import { moviesApiUrl } from "../endpoints";
import { Actor, Genre, MovieForm as Movie, Theater } from "../models";
import { DisplayErrors } from "../shared";
import { convertMovieToFormData } from "../utils/convertMovieToFormData";


interface EditedMovie {
  movie: Movie;
  selectedGenres: Genre[];
  nonSelectedGenres: Genre[];
  selectedTheaters:Theater[];
  nonSelectedTheaters: Theater[];
  actors: Actor[];
}

export default function EditMovie () {
  const {id}: any = useParams();
  const [movie, setMovie] = useState<Movie>();
  const [editedMovie, setEditedMovie] = useState<EditedMovie>();
  const [errors, setErrors] = useState<string[]>([]);

 const history = useHistory();

useEffect(() => {

  axios.get(`${moviesApiUrl}/PutGet/${id}`)
  .then((resp: AxiosResponse<EditedMovie>) => {
    const movie: Movie = {
      title: resp.data.movie.title,
      posterUrl: resp.data.movie.poster,
      inTheaters: resp.data.movie.inTheaters,
      releaseDate: new Date(resp.data.movie.releaseDate || ''),
      trailer: resp.data.movie.trailer,
      summary: resp.data.movie.summary
    }

    setMovie(movie);
    setEditedMovie(resp.data);

  })
},[id])

async function update(movie: Movie) {
  try {
    const formData = convertMovieToFormData(movie);
    axios(({
      method: 'put',
      url: `${moviesApiUrl}/${id}`,
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'}
    }));
    history.push('/movies');

  } catch(err) {
    setErrors(err.response.data)
  }
}

    return (
        <>
        <h1>Edit Movie</h1>
        <DisplayErrors errors={errors} />
        {movie && editedMovie ? 
          <MovieForm
          model={movie}
          onSubmit={async value => {
            await update(value);
        }}
        selectedGenres={editedMovie?.selectedGenres}
        nonSelectedGenres={editedMovie?.nonSelectedGenres}
        selectedTheaters={editedMovie?.selectedTheaters}
        nonSelectedTheaters={editedMovie?.selectedTheaters}
        selectedActors={editedMovie?.actors} 
        /> : null}
        </>
    );
}