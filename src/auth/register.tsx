import axios from "axios";
import { useState } from "react";
import { AuthForm } from ".";
import { accountsApiUrl } from "../endpoints";
import { AuthResp, UserCredentials } from "../models";
import { DisplayErrors } from "../shared";

export default function Register() {

    const [errors, setErrors] = useState<string[]>([]);

    async function  register(value: UserCredentials) {
        try {
            setErrors([]);
            const resp = await axios.post<AuthResp>(`${accountsApiUrl}/create`, value);
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