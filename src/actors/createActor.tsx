import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ActorForm } from ".";
import { actorsApiUrl } from "../endpoints";
import { Actor } from "../models";
import { DisplayErrors } from "../shared";
import { convertActorToFormData } from "../utils/convertActorToFormData";

export default function CreateActor () {

  const history = useHistory();
  const [errors, setErrors] = useState<string[]>([]);

  async function create(actor: Actor) {

    try {
      var formData = convertActorToFormData(actor);
      await axios(actorsApiUrl, {
        method: 'post',
        data: formData,
        headers: {'Content-Type': 'multipart-formdata'}
      });
      history.push('/actors');
    } catch(error) {
      if(error && error.response) {
        setErrors(error.response.data);
      }
    }

  }
    return (
        <>
        <h1>Create Actor</h1>
        <DisplayErrors errors={errors} />
        <ActorForm
          model={{name: '', dateOfBirth: undefined}}
          onSubmit={async value => {
            console.log(value)
            await create(value);
        }}
          />
        </>
    );
}