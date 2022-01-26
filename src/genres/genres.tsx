import { genresApiUrl } from "../endpoints";
import { Genre } from "../models";
import { IndexEntity } from "../shared";

export default function Genres () {

    return (
        <>
        <IndexEntity<Genre>
         apiUrl={genresApiUrl}
         title={"Genres"}
         entityName={"genre"}
         createUrl={"/genres/create"}
        >
            {(genres, buttons) => 
            <>
            <thead>
            <tr>
            <th></th>
            <th>Name</th>
            </tr>
        </thead>
        <tbody>
            {genres.map(item => 
                <tr key={item.id}>
                    <td>
                       {buttons(`genres/edit/${item.id}`, item.id)}
                    </td>
                    <td>{item.name}</td>
                </tr>
                )}
        </tbody>
        </>
            }

        </IndexEntity>
        </>
    );
}
