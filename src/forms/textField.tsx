import { ErrorMessage, Field } from "formik";

interface TextFieldProps{
fieldName: string;
fieldLabel: string;
}

export default function TextField(props: TextFieldProps) {
    return (
        <div className="mb-3">
        <label htmlFor={props.fieldName}>{props.fieldLabel}</label>
        <Field name={props.fieldName} className="form-control" />
        <ErrorMessage name={props.fieldName}>{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
        </div>
         
    );
}