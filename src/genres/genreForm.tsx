import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import { Button } from "../shared";
import * as Yup from 'yup';
import { TextField } from "../forms";
import { Genre } from "../models";

interface GenreFormProps {
    model: Genre;
    onSubmit(values: Genre, helpers: FormikHelpers<Genre>): void;
}

export default function GenreForm (props: GenreFormProps) {

    return (
        <>
        <Formik initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object(
            {
                name: Yup.string().required('This field is required').firstLetterUppercase()
            }
        )}
        >
            {(formikProps) => (
                 <Form>
                 <TextField fieldLabel="Name" fieldName="name"/>
                  <Button disabled={formikProps.isSubmitting} type="submit">Save changes</Button>
                  <Link className="btn btn-secondary" to="/genres">Cancel</Link>
              </Form>
            )}

           
        </Formik>
        </>
    );
}
