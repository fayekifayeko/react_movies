import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import { Button } from "../shared";
import * as Yup from 'yup';
import { MapField, TextField } from "../forms";
import { Coordinate, Theater } from "../models";

interface TheaterFormProps {
    model: Theater;
    onSubmit(values: Theater, helpers: FormikHelpers<Theater>): void;
}

export default function TheaterForm (props: TheaterFormProps) {

    const transformCoordinates = (): Coordinate[] => {
        if(props.model.longitude && props.model.langitude) {
            const resp = {lat: props.model.langitude, lng: props.model.longitude}
            return [resp];
        }

        return [];
    }

    return (
        <>
        <Formik initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object(
            {
                name: Yup.string().required('This field is required').firstLetterUppercase(),
            }
        )}
        >
            {(formikProps) => (
                 <Form>
                 <TextField fieldLabel="Name" fieldName="name" />
                 <div style={{marginBottom: '1rem'}}>
                     <MapField latField="langitude" lngField="longitude" coordinates={transformCoordinates()}/>
                 </div>
                  <Button disabled={formikProps.isSubmitting} type="submit">Save changes</Button>
                  <Link className="btn btn-secondary" to="/actors">Cancel</Link>
              </Form>
            )} 
        </Formik>
        </>
    );
}
