import axios, { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { MoviesList } from ".";
import { genresApiUrl, moviesApiUrl } from "../endpoints";
import { Genre, Movie, MoviesFilter } from "../models";
import { Button } from "../shared";
import Pagination from "../shared/pagination";

export default function FilterMovies () {

  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);

  const history = useHistory();
  const query = new URLSearchParams(useLocation().search)

    const initialFilter: MoviesFilter = {
        genreId: 0,
        title: '',
        upcomingReleases: false,
        inTheaters: false,
        page: 1,
        recordPerPage: 1
    }

    useEffect(() => {
      axios.get(`${genresApiUrl}/all`)
      .then((res: AxiosResponse<Genre[]>) => {
        setGenres(res.data)
      })
    }, []);

    function searchMovie(filterValues: MoviesFilter) {
      buildUrl(filterValues);
      axios(`${moviesApiUrl}/filter`, {
        params: filterValues
      })
      .then((resp: AxiosResponse<Movie[]>) => {
        const totalAmountOfRecords = parseInt(resp.headers['totalamountofrecords'], 10);
        setNumberOfPages(Math.ceil(totalAmountOfRecords / filterValues.recordPerPage));
        setMovies(resp.data);
      })
    }

    useEffect(() => {

      if(query.get('title')) initialFilter.title = query.get('title')!;
      if(query.get('genreId')) initialFilter.genreId = parseInt(query.get('genreId')!, 10);
      if(query.get('upcomingReleases')) initialFilter.upcomingReleases = true;
      if(query.get('inTheaters')) initialFilter.inTheaters = true;
      if(query.get('title')) initialFilter.title = query.get('title')!;
      if(query.get('page')) initialFilter.page =  parseInt(query.get('page')!, 10);

      searchMovie(initialFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

function buildUrl(filterValues: MoviesFilter){ 
const queryString =  Object.entries(filterValues).reduce<string []>((acc, [key, value]) => {
if(!!value) {
  acc.push(`${key}=${value}`);
}
return acc;
}, [])

history.push(`/movies/filter?${queryString.join('&')}`) ;

}

    return (
        <>
        <h1>Filter Movies</h1>
        <Formik onSubmit={values => {
            values.page = 1;
            searchMovie(values);
        }} 
        initialValues={initialFilter}
        >
            {(formikProps) => (
              <>
               <Form className="row gy-2 gx-3 align-items-center mb-3">
               <div className="col-auto">
                 <input 
                 type="text" 
                 className="form-control" 
                 id="title" 
                 placeholder="Title of the movie"
                 {...formikProps.getFieldProps('title')}
                 />
               </div>
               <div className="col-auto">
                 <select className="form-select" id="genreId" {...formikProps.getFieldProps('genreId')}>
                   <option value="0">Choose a genre</option>
                  {genres.map(item => 
                    <option key={item.id} value={item.id}>{item.name}</option>
                    )}
                 </select>
               </div>
               <div className="col-auto">
                 <div className="form-check">
                     <Field id="upcomingReleases" name="upcomingReleases" className="form-check-input" type="checkbox"/>
                     <label className="form-check-label" htmlFor="upcomingReleases">
                     Upcoming Releases
                   </label>
                 </div>
               </div>
               <div className="col-auto">
                 <div className="form-check">
                     <Field id="inTheaters" name="inTheaters" className="form-check-input" type="checkbox"/>
                     <label className="form-check-label" htmlFor="inTheaters">
                     In Theaters
                   </label>
                 </div>
               </div>
               <div className="col-auto">
                 <Button
                 onClick={() =>formikProps.submitForm()}
                 className="btn btn-primary">
                     Filter
                </Button>
                <Button
                 onClick={() =>formikProps.setValues(initialFilter)}
                 className="btn btn-danger ms-3">
                     Clear
                </Button>
               </div>
               </Form>
               <MoviesList movies={movies}/>
               <Pagination currentPage={formikProps.values.page} numberOfPages={numberOfPages} onChange={value => {
                 formikProps.values.page = value;
                 searchMovie(formikProps.values);
               }} />
               </>
               )}
        </Formik>
        
        </>
    )}