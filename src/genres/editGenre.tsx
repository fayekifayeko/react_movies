import { useParams } from "react-router-dom";

export default function EditGenre () {

    const {id}: any = useParams();

    return (
        <>
        <h1>Edit Genre</h1>
        The param id = {id}
        </>
    );
}