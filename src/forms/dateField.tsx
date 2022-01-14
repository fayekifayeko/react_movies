import { useFormikContext } from "formik";

interface DateFieldProps{
    fieldName: string;
    fieldLabel: string;
}

export default function DateField(props: DateFieldProps) {

    const {values, validateForm, touched, errors} = useFormikContext<any>();

    return (
        <div className="mb-3">
            <label htmlFor={props.fieldName} className="">{props.fieldLabel}</label>
            <input
             type="date"
             className="form-control"
             id={props.fieldName}
             name={props.fieldName}
             defaultValue={values[props.fieldName]?.toISOString().substr(0, 10)}
             onChange={(e) =>{
                 const date = new Date(e.currentTarget.value + 'T00:00:00');
                 values[props.fieldName] = date;
                 validateForm();
             }}
               />
            {touched[props.fieldName] && errors[props.fieldName] ? 
            <div className="text-danger">{errors[props.fieldName]?.toString()}</div>:
            null
        }
        </div>
    );
}