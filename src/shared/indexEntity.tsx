import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";
import { Button, GenericList, RecordPerPageSelector } from "../shared";
import customConfirm from "../shared/customConfirm";
import Pagination from "../shared/pagination";



interface IndexEntityProps<T> {
    apiUrl: string;
    title: string;
    entityName: string;
    createUrl: string;
    children(entities: T[], buttons: (editUrl:string, id?:number) => ReactElement): ReactElement;
}

export default function IndexEntity<T>(props: IndexEntityProps<T>) {

    const [entities, setEntities] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(2);


    useEffect(() => {
        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function deleteEntity(id: number) {
        try {
              await axios.delete(`${props.apiUrl}/${id}`);
              loadData();
        } catch(err) {
            console.log(err);
        }
    }

    function loadData() {
        axios.get(props.apiUrl,{
            params: {page, recordsPerPage}
        } 
            )
        .then((response: AxiosResponse<T[]>) =>{
            const totalAmountOfRecords = parseInt(response.headers['totalamountofrecords'], 10);
            setNumberOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
            setEntities(response.data);
        })
    }

    const buttons = (editUrl: string, id?: number) => 
    <>
    <Link className="btn btn-success" to={editUrl}>Edit</Link>
    <Button className="btn btn-danger" onClick={() => customConfirm(() => id && deleteEntity(id))}>Delete</Button>
    </>

    return (
        <>
        <h1>{props.title}</h1>
        <Link style={{marginRight: '1rem'}} className="btn btn-primary" to={props.createUrl}>{`Create a ${props.entityName}`}</Link>
        <RecordPerPageSelector onChange={value => {
           setPage(1);
           setRecordsPerPage(value);
        }
        }/>
        <Pagination numberOfPages={numberOfPages} currentPage={page} onChange={value => setPage(value)} />
        <GenericList list={entities}>
        <table className="table table-striped">
          {props.children(entities, buttons)}
        </table>    
        </GenericList>
        </>
    );
}
