import { actorsApiUrl } from "../endpoints";
import { Actor } from "../models";
import { IndexEntity } from "../shared";

export default function Actors () {
    return (
        <>
        <IndexEntity<Actor>
         apiUrl={actorsApiUrl}
         title={"Actors"}
         entityName={"actor"}
         createUrl={"/actors/create"}
        >
            {(actors, buttons) => 
            <>
            <thead>
            <tr>
            <th></th>
            <th>Name</th>
            </tr>
        </thead>
        <tbody>
            {actors.map(item => 
                <tr key={item.id}>
                    <td>
                       {buttons(`actors/edit/${item.id}`, item.id)}
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