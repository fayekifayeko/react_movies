import { MovieForm } from ".";
import { ActorTypeAhead, Genre, Theater } from "../models";

export default function EditMovie () {
  const nonSelectedGenres: Genre[] = [{id: 1, name: 'Comedy'}];
  const selectedGenres: Genre[] = [{id: 2, name: 'Drama'}];;

  const selectedTheaters: Theater[] = [{id: 1, name: 'Sampil'}];
  const nonSelectedTheaters: Theater[] = [{id: 2, name: 'Aigora'}];

  const actors: ActorTypeAhead[] = [
    {
        id: 1, name: 'Fellip', character: '', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Tom_Cruise_by_Gage_Skidmore_2.jpg/250px-Tom_Cruise_by_Gage_Skidmore_2.jpg'
    }
];

    return (
        <>
        <h1>Edit Movie</h1>
        <MovieForm
          model={{title: 'Troy', inTheaters: true, releaseDate: new Date('2021-06-01T00:00:00'), actors}}
          onSubmit={async values => {
            await new Promise(r => setTimeout(r, 3000));
            console.log(values);
        }}
        selectedGenres={selectedGenres}
        nonSelectedGenres={nonSelectedGenres}
        selectedTheaters={selectedTheaters}
        nonSelectedTheaters={nonSelectedTheaters}
        selectedActors={actors} 
        />
        </>
    );
}