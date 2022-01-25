import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { genresApiUrl } from "../endpoints";
import { Genre } from "../models";
import { Button, GenericList, RecordPerPageSelector } from "../shared";
import customConfirm from "../shared/customConfirm";
import Pagination from "../shared/pagination";

export default function Genres () {

    const [genres, setGenres] = useState<Genre[]>([]);
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(2);


    useEffect(() => {
        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function deleteGenre(id: number) {
        try {
              await axios.delete(`${genresApiUrl}/${id}`);
              loadData();
        } catch(err) {
            console.log(err);
        }
    }

    function loadData() {
        axios.get(genresApiUrl,{
            params: {page, recordsPerPage}
        } 
            )
        .then((response: AxiosResponse<Genre[]>) =>{
            const totalAmountOfRecords = parseInt(response.headers['totalamountofrecords'], 10);
            setNumberOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
            setGenres(response.data);
        })
    }

    return (
        <>
        <h1>Genres</h1>
        <Link style={{marginRight: '1rem'}} className="btn btn-primary" to="/genres/create"> Create a genre</Link>
        <RecordPerPageSelector onChange={value => {
           setPage(1);
           setRecordsPerPage(value);
        }
        }/>
        <Pagination numberOfPages={numberOfPages} currentPage={page} onChange={value => setPage(value)} />
        <GenericList list={genres}>
        <table className="table table-striped">
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
                            <Link className="btn btn-success" to={`genres/edit/${item.id}`}>Edit</Link>
                            <Button className="btn btn-danger" onClick={() => customConfirm(() =>  item.id && deleteGenre(item.id))}>Delete</Button>
                        </td>
                        <td>{item.name}</td>
                    </tr>
                    )}
            </tbody>
        </table>    
        </GenericList>
        </>
    );
}
