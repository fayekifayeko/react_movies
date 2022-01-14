import { useParams } from "react-router-dom";
import { GenreForm } from ".";

export default function EditGenre () {

    const {id}: any = useParams();

    return (
        <>
        <h1>Edit Genre</h1>
        <GenreForm
          model={{name: 'Action'}}
          onSubmit={async values => {
            await new Promise(r => setTimeout(r, 3000));
            console.log(id);
            console.log(values);
        }} />
        </>
    );
}