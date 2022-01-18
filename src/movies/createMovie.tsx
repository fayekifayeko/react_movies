import { MovieForm } from ".";
import { Genre, Theater } from "../models";

export default function CreateMovie () {

  const nonSelectedGenres: Genre[] = [{id: 1, name: 'Comedy'}, {id: 2, name: 'Drama'}];
  const selectedGenres: Genre[] = [];

  const selectedTheaters: Theater[] = [{id: 1, name: 'Sampil'}, {id: 2, name: 'Aigora'}];
  const nonSelectedTheaters: Theater[] = [];

    return (
        <>
        <h1>Create Movie</h1>
        <MovieForm
          model={{title: '', inTheaters: false, actors: []}}
          onSubmit={async values => {
            await new Promise(r => setTimeout(r, 3000));
            console.log(values);
        }}
        selectedGenres={selectedGenres}
        nonSelectedGenres={nonSelectedGenres}
        selectedTheaters={selectedTheaters}
        nonSelectedTheaters={nonSelectedTheaters}
        selectedActors={[]}
          />
        </>
    );
}