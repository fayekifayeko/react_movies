import { useContext, useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import AuthunticateContext from "../context/authenticateContext";

export default function Authorized (props: AuthorizedProps) {
const [authorized, setAuthorized] = useState(false);
const {claims} = useContext(AuthunticateContext);

useEffect(() => {
    if(props.role) {
        const index = claims.findIndex(item => item.name === 'role' && item.value === props.role);
        setAuthorized(index > -1);

    } else {
        setAuthorized(claims.length > 0);

    }

}, [claims, props.role])

return (
    <>
    {authorized ? props.authorized : props.nonAuthorized}
    </>
);
}

export interface AuthorizedProps  {
authorized: ReactElement;
nonAuthorized?: ReactElement;
role?: string;
}