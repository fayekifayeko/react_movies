import { Link } from "react-router-dom";

export default function Theaters () {
    return (
        <>
        <h1>Theaters</h1>
        <Link className="btn btn-primary" to="/theaters/create"> Create a Theater</Link>
        <Link className="btn btn-primary" to="/theaters/edit"> Edit a Theater</Link>
        </>
    );
}