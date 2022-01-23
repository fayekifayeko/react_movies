import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { genresApiUrl } from "../endpoints";
import { Genre } from "../models";
import { Button, GenericList } from "../shared";

export default function Genres () {

    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        axios.get(genresApiUrl)
        .then((response: AxiosResponse<Genre[]>) => setGenres(response.data));
    }, [])

    return (
        <>
        <h1>Genres</h1>
        <GenericList list={genres}>
        <table className="table table-striped">
            <thead>
                <th></th>
                <th>Name</th>
            </thead>
            <tbody>
                {genres.map(item => 
                    <tr key={item.id}>
                        <td>
                            <Link className="btn btn-success" to={`genres/edit/${item.id}`}>Edit</Link>
                            <Button className="btn btn-danger">Delete</Button>
                        </td>
                        <td>{item.name}</td>
                    </tr>
                    )}
            </tbody>
        </table>    
        </GenericList>
        <Link className="btn btn-primary" to="/genres/create"> Create a genre</Link>
        <Link className="btn btn-primary" to="/genres/edit"> Edit a genre</Link>
        </>
    );
}
