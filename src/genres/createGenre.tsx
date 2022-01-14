import { GenreForm } from ".";


export default function CreateGenre () {

    return (
        <>
        <h1>Create Genre</h1>
        <GenreForm
          model={{name: ''}}
          onSubmit={async values => {
            await new Promise(r => setTimeout(r, 3000));
            console.log(values);
        }}
          />
        </>
    );
}