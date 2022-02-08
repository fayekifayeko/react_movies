import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from ".";
import { Authorized } from "../auth";
import { logout } from "../auth/handleJwtToken";
import AuthunticateContext from "../context/authenticateContext";

export default function NavBar () {

  const {update, claims } = useContext(AuthunticateContext)

  function getUserEmail() {
    return claims.find(x => x.name === 'email')?.value;
  }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">React Movies</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <Authorized 
        role="admin"
        authorized={
          <>
              <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/genres">Genres</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/actors">Actors</NavLink>
        </li> <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/theaters">Theaters</NavLink>
        </li> <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/movies/create">Create a movie</NavLink>
        </li> <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/movies/edit">Edit a movie</NavLink>
        </li> 
          </>
        }
        />     
    <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/movies/filter">Filter movies</NavLink>
        </li>
      </ul>
      <div className="d-flex">
          <Authorized
          authorized={
          <>
          <span className="nav-link">Hello, {getUserEmail()}</span>
          <Button className="nav-link btn btn-link" onClick={() => {
logout();
update([]);
          }}>Logout</Button>
          </>}
          nonAuthorized={
            <>
            <Link className="btn btn-link nav-link" to={'/register'}>Register</Link>
            <Link className="btn btn-link nav-link" to={'/login'}>Login</Link>
            </>
          }
          
          />
        </div>
    </div>
  </div>
</nav>
    );
}
