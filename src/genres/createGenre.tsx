import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { GenreForm } from ".";
import { genresApiUrl } from "../endpoints";
import { Genre } from "../models";
import { DisplayErrors } from "../shared";

export default function CreateGenre () {

  const [errors, setErrors] = useState<string[]>([]);

  const history = useHistory();

  async function create(genre: Genre) {
    try {
      await axios.post(genresApiUrl, genre);
      history.push('/genres');
    } catch(err) {
      console.log(err);
      err && err.response && setErrors(err.response.data);
    }
  }

    return (
        <>
        <h1>Create Genre</h1>
        <DisplayErrors errors={errors} />
        <GenreForm
          model={{name: ''}}
          onSubmit={create}
          />
        </>
    );
}