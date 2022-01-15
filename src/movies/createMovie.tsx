import { MovieForm } from ".";

export default function CreateMovie () {
    return (
        <>
        <h1>Create Movie</h1>
        <MovieForm
          model={{title: '', inTheaters: false}}
          onSubmit={async values => {
            await new Promise(r => setTimeout(r, 3000));
            console.log(values);
        }}
          />
        </>
    );
}