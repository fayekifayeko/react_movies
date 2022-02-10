import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthForm } from ".";
import AuthunticateContext from "../context/authenticateContext";
import { accountsApiUrl } from "../endpoints";
import { AuthResp, UserCredentials } from "../models";
import { DisplayErrors } from "../shared";
import { getClaims, saveToken } from "./handleJwtToken";

export default function Register() {

    const [errors, setErrors] = useState<string[]>([]);
    const {update} = useContext(AuthunticateContext)
    const history = useHistory();

    async function  register(value: UserCredentials) {
        try {
            setErrors([]);
            const resp = await axios.post<AuthResp>(`${accountsApiUrl}/create`, value);
            saveToken(resp.data);
            update(getClaims());
            history.push('/');

            console.log(resp);

        }catch(err) {
            setErrors(err.response.data);
        }
    }

    return (
        <>
        <h3>Register</h3>
        <DisplayErrors errors={errors} />
        <AuthForm 
        model={{email: '', password: ''}}
         onSubmit={async (value) =>  await register(value)} 
            />
        </>
    );
}
