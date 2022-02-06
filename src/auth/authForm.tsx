import { Form, Formik, FormikHelpers } from "formik";
import { UserCredentials } from "../models";
import * as Yup from 'yup';
import { TextField } from "../forms";
import { Button } from "../shared";
import { Link } from "react-router-dom";

export default function AuthForm(props: AuthFormProps) {
    return(
        <>
        <Formik initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object(
            {
                email: Yup.string().required('This field is required').email('You have to enter a valid email'),
                password: Yup.string().required('This field is required'),

            }
        )}
        >
            {(formikProps) => (
                 <Form>
                 <TextField fieldLabel="Email" fieldName="email" />
                 <TextField fieldLabel="Password" fieldName="password" type='password' />
                   

                  <Button disabled={formikProps.isSubmitting} type="submit">Send</Button>
                  <Link className="btn btn-secondary" to="/">Cancel</Link>
              </Form>
            )} 
        </Formik>
        </>
    );
} 

interface AuthFormProps {
    model: UserCredentials,
    onSubmit(values: UserCredentials, helpers: FormikHelpers<UserCredentials>): void;
}