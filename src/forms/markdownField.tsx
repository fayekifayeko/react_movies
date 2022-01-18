import { Field, useFormikContext } from "formik";
import ReactMarkdown from "react-markdown";
import '../stylings/markdownField.css';

interface MarkdownFieldProps {
    fieldName: string;
    fieldLabel: string;
}

export default function MarkdownField (props: MarkdownFieldProps) {

    const {values} = useFormikContext<any>();

    return (
        <div className="mb-3 form-markdown">
            <div>
            <label style={{display: 'block'}}  htmlFor={props.fieldName}>{props.fieldLabel}</label>
            <Field name={props.fieldName} as="textarea" className="form-texarea" />
            </div>
            <div>
            <label htmlFor={props.fieldName}>{props.fieldLabel} (Preview)</label>
            <div className="markdown-container">
            <ReactMarkdown>{values[props.fieldName]}</ReactMarkdown>
            </div>
            </div>
        </div>
    );
}