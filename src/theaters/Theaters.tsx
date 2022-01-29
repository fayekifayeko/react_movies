import { theatersApiUrl } from "../endpoints";
import { Theater } from "../models";
import { IndexEntity } from "../shared";

export default function Theaters () {
    return (
        <>
        <IndexEntity<Theater>
         apiUrl={theatersApiUrl}
         title={"Theaters"}
         entityName={"theaters"}
         createUrl={"/theaters/create"}
        >
            {(theaters, buttons) => 
            <>
            <thead>
            <tr>
            <th></th>
            <th>Name</th>
            </tr>
        </thead>
        <tbody>
            {theaters.map(item => 
                <tr key={item.id}>
                    <td>
                       {buttons(`theaters/edit/${item.id}`, item.id)}
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