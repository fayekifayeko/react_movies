import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import { Button } from "../shared";
import * as Yup from 'yup';
import { CheckboxField, DateField, MapField, TextField } from "../forms";
import { MovieForm as MovieFormModel } from "../models";
import ImageField from "../forms/imageField";

interface MovieFormProps {
    model: MovieFormModel;
    onSubmit(values: MovieFormModel, helpers: FormikHelpers<MovieFormModel>): void;
}

export default function MovieForm (props: MovieFormProps) {

    return (
        <>
        <Formik initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object(
            {
                title: Yup.string().required('This field is required').firstLetterUppercase(),
            }
        )}
        >
            {(formikProps) => (
                 <Form>
                 <TextField fieldLabel="Title" fieldName="title" />
                 <TextField fieldLabel="Trailer" fieldName="trailer" />
                 <CheckboxField fieldLabel="In theaters" fieldName="inTheaters" />
                 <DateField fieldLabel="Release date" fieldName="releaseDate" />
                 <ImageField fieldLabel="Poster" fieldName="poster" imgUrl={props.model.posterUrl}/>


                  <Button disabled={formikProps.isSubmitting} type="submit">Save changes</Button>
                  <Link className="btn btn-secondary" to="/movies">Cancel</Link>
              </Form>
            )} 
        </Formik>
        </>
    );
}
