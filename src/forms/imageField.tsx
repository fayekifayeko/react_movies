import { useFormikContext } from "formik";
import { ChangeEvent, useState } from "react";

interface ImageFieldProps{
    fieldLabel: string;
    imgUrl?: string;
    fieldName: string;
}

export default function ImageField(props: ImageFieldProps) {

    const [imgBase64,setImgBase64] = useState('');
    const [imgUrl, setImgUrl] = useState(props.imgUrl);

    const {values} = useFormikContext<any>();

    const toBase64 = (file: File) => {

        return new Promise<string> ((resolve, reject) => {
            const reader =new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];

        if(file) {
            toBase64(file)
            .then(result => setImgBase64(result))
            .catch(error => console.log(error));

            setImgUrl('');
            values[props.fieldName] = file;
        } else {
            setImgBase64('');
        }

    }

    return(
        <div className="mb-3">
            <label>{props.fieldLabel}</label>
            <input
            accept=".jpg, .jpeg, .png"
            type="file"  
            className="form-control"
            onChange={handleChange}
            />
            {imgBase64 ? 
        <div>
            <div style={{marginTop: '10px'}}>
                <img style={{width: '300px'}} src={imgBase64} alt="selected img" />
            </div>
        </div> :
        null   
        }

{imgUrl ? 
        <div>
            <div style={{marginTop: '10px'}}>
                <img style={{width: '300px'}} src={imgUrl} alt="selected img" />
            </div>
        </div> :
        null   
        }

        </div>
    );
}