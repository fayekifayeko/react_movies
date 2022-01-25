import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Loader } from "react-bootstrap-typeahead";
import { useHistory, useParams } from "react-router-dom";
import { GenreForm } from ".";
import { genresApiUrl } from "../endpoints";
import { Genre } from "../models";
import { DisplayErrors } from "../shared";

export default function EditGenre () {

    const {id}: any = useParams();
    const [genre, setGenre] = useState<Genre>();
    const [errors, setErrors] = useState<string[]>([]);
    const history = useHistory();

    async function edit(genre: Genre) {
        try {
              await axios.put(`${genresApiUrl}/${id}`, genre);
              history.push('/genres');

        } catch(err) {
            err && err.response && setErrors(err.response.data);
        }
    }

    useEffect(() => {
        axios.get(`${genresApiUrl}/${id}`)
        .then((response: AxiosResponse<Genre>) =>{
            setGenre(response.data);
        })
    }, [id]);

    return (
        <>
        <h1>Edit Genre</h1>
        <DisplayErrors errors={errors} />
        {genre ?
                <GenreForm
                model={genre}
                onSubmit={async value => {
                  await edit(value);
              }} /> 
    :
    <Loader />    
    }

        </>
    );
}