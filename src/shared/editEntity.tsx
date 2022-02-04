import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { DisplayErrors, Loader } from "../shared";

interface EditEntityProps<T, TResp> {
    apiUrl: string;
    redirectUrl: string;
    entityName: string;
    transform(resp: TResp): T;
    children(entity: T, edit: (entity: T) => void ): ReactElement;
    transformToFormData?(entity: T):FormData;
}

export default  function EditEntity<T, TResp>(props: EditEntityProps<T, TResp>) {

    const {id}: any = useParams();
    const [entity, setEntity] = useState<T>();
    const [errors, setErrors] = useState<string[]>([]);
    const history = useHistory();

    async function edit(entity: T) {

        try {

            if(props.transformToFormData) {
                await axios({
                    url: `${props.apiUrl}/${id}`,
                    method: 'put',
                    data: props.transformToFormData(entity),
                    headers: {'Content-Type': 'multipart/form-data'}
                });
            } else {
                await axios.put(`${props.apiUrl}/${id}`, entity);

            }
              history.push(props.redirectUrl);

        } catch(err) {
            err && err.response && setErrors(err.response.data);
        }
    }

    useEffect(() => {
        axios.get(`${props.apiUrl}/${id}`)
        .then((response: AxiosResponse<TResp>) =>{
            setEntity(props.transform(response.data));
        })
    }, [id, props, props.apiUrl]);

    return (
        <>
        <h1>{`Edit ${props.entityName}`}</h1>
        <DisplayErrors errors={errors} />
        {entity ?
                props.children(entity, edit)
    :
    <Loader />    
    }

        </>
    );
}

EditEntity.defaultProps = {
    transform: (entity: any) => entity
}