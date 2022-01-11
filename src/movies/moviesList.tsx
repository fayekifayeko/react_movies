import { MoviesList as MoviesListModel } from "../models";
import Movie from "./movie";
import css from '../stylings/moviesList.module.css';
import { GenericList } from "../shared";

export default function MoviesList (props: MoviesListModel)  {

    return (
        <GenericList list={props.movies}>
            <div className={css.div}>
                {props.movies?.map(movie => <Movie key={movie.id} {...movie} />)}
            </div>
        </GenericList>
    );
}