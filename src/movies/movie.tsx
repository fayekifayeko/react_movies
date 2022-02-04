import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Authorized } from '../auth';
import loadDataContext from '../context/loadDataContext';
import { moviesApiUrl } from '../endpoints';
import {Movie as MovieModel} from '../models'
import { Button } from '../shared';
import customConfirm from '../shared/customConfirm';
import css from '../stylings/movie.module.css';

export default function Movie (props: MovieModel) {

    const loadData = useContext(loadDataContext);

    const buildLink = () => `/movies/${props.id}`;

    function deleteMovie () {
        axios.delete(`${moviesApiUrl}/${props.id}`)
        .then(() => {
            loadData();
        })
    }

    return (
        <div className={css.div}>
            <Link to={buildLink()}>
                <img alt="Poster" src={props.poster}></img>
            </Link>
            <p>
                <Link to={buildLink()}>
                    {props.title}
                    </Link>
                </p>
                <Authorized 
                role='admin'
                authorized={
                    <div>
                    <Link className='btn btn-info' style={{marginRight: '1rem'}} to={`/movies/edit/${props.id}`}>Edit</Link>
                    <Button className='btn btn-danger' onClick={() => customConfirm(() => deleteMovie())}>Delete</Button>
                </div>
                }
                />
              
        </div>
    );

}