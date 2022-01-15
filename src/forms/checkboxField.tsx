import { Field } from "formik";

interface CheckboxFieldProps{
    fieldName: string;
    fieldLabel: string;
}

export default function CheckboxField(props: CheckboxFieldProps) {

    return (
        <div className="mb-3 form-check">
            <Field
             type="checkbox"
             className="form-check-input"
             id={props.fieldName}
             name={props.fieldName}
               />
        <label htmlFor={props.fieldName} className="">{props.fieldLabel}</label>
        </div>
    );
}