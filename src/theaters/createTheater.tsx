import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { TheaterForm } from ".";
import { theatersApiUrl } from "../endpoints";
import { Theater } from "../models";
import { DisplayErrors } from "../shared";

export default function CreateTheater () {
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();

  async function create(theater: Theater) {
    try {
      console.log('h', theater)
      await axios.post(theatersApiUrl, theater);
      history.push('/theaters');
    } catch(err) {
      console.log(err);
      err && err.response && setErrors(err.response.data);
    }
  }


    return (
        <>
        <h1>Create Theater</h1>
        <DisplayErrors errors={errors} />
        <TheaterForm
          model={{name: ''}}
          onSubmit={create}
          />
        </>
    );
}