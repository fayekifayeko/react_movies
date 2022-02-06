import { ErrorMessage, Field } from "formik";

interface TextFieldProps{
fieldName: string;
fieldLabel: string;
type: 'text' | 'password'
}

export default function TextField(props: TextFieldProps) {
    return (
        <div className="mb-3">
        <label htmlFor={props.fieldName}>{props.fieldLabel}</label>
        <Field name={props.fieldName} className="form-control" type={props.type}/>
        <ErrorMessage name={props.fieldName}>{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
        </div>
         
    );
}

TextField.defaultProps = {
    type: 'text'
}