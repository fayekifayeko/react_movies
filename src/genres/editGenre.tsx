import { GenreForm } from ".";
import { genresApiUrl } from "../endpoints";
import { Genre } from "../models";
import { EditEntity } from "../shared";


export default function EditGenre () {

    return (
        <EditEntity<Genre, Genre>
        apiUrl={genresApiUrl}
        redirectUrl="/genres"
        entityName="Genres"
        >
              {(genre, edit) => 
                <GenreForm
                model={genre}
                onSubmit={async value => {
                  await edit(value);
              }} /> }
</EditEntity>

    );
}