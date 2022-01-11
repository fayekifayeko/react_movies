import { useHistory } from "react-router-dom";
import { Button } from "../shared";

export default function CreateGenre () {

    const history = useHistory();
    return (
        <>
        <h1>Create Genre</h1>
        <Button onClick={() => history.push('/genres')}>Save changes</Button>
        </>
    );
}