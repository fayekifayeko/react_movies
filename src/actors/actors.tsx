import { Link } from "react-router-dom";

export default function Actors () {
    return (
        <>
        <h1>Actors</h1>
        <Link className="btn btn-primary" to="/actors/create"> Create an actor</Link>
        <Link className="btn btn-primary" to="/actors/edit"> Edit an actor</Link>
        </>
    );
}