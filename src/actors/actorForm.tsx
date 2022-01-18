import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import { Button } from "../shared";
import * as Yup from 'yup';
import { DateField, TextField } from "../forms";
import { Actor } from "../models";
import ImageField from "../forms/imageField";
import MarkdownField from "../forms/markdownField";
interface ActorFormProps {
    model: Actor;
    onSubmit(values: Actor, helpers: FormikHelpers<Actor>): void;
}

export default function ActorForm (props: ActorFormProps) {

    return (
        <>
        <Formik initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object(
            {
                name: Yup.string().required('This field is required').firstLetterUppercase(),
                dateOfBirth: Yup.date().nullable().required('This field is required')
            }
        )}
        >
            {(formikProps) => (
                 <Form>
                 <TextField fieldLabel="Name" fieldName="name" />
                 <DateField fieldLabel="Date of birth" fieldName="dateOfBirth" />
                 <ImageField fieldLabel="Image" fieldName="image" imgUrl={props.model.imgUrl}/>
                 <MarkdownField fieldName="biography" fieldLabel="biography" />
                  <Button disabled={formikProps.isSubmitting} type="submit">Save changes</Button>
                  <Link className="btn btn-secondary" to="/actors">Cancel</Link>
              </Form>
            )} 
        </Formik>
        </>
    );
}
