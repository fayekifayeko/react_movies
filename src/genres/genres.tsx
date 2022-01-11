import { Link } from "react-router-dom";

export default function Genres () {
    return (
        <>
        <h1>Genres</h1>
        <Link className="btn btn-primary" to="/genres/create"> Create a genre</Link>
        <Link className="btn btn-primary" to="/genres/edit"> Edit a genre</Link>
        </>
    );
}