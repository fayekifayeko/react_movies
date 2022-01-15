import { MovieForm } from ".";

export default function EditMovie () {
    return (
        <>
        <h1>Edit Movie</h1>
        <MovieForm
          model={{title: 'Troy', inTheaters: true, releaseDate: new Date('2021-06-01T00:00:00')}}
          onSubmit={async values => {
            await new Promise(r => setTimeout(r, 3000));
            console.log(values);
        }}
          />
        </>
    );
}