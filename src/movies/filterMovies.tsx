import { Field, Form, Formik } from "formik";
import { Genre, MoviesFilter } from "../models";
import { Button } from "../shared";

export default function FilterMovies () {

    const initialFilter: MoviesFilter = {
        genreId: 0,
        title: '',
        upcomingReleases: false,
        inTheaters: false
    }

    const genresList: Genre[] = [{id: 1, name: 'Drama'}, {id: 2, name: 'Comedy'}];

    return (
        <>
        <h1>Filter Movies</h1>
        <Formik onSubmit={values => {
            console.log(values)
        }} 
        initialValues={initialFilter}
        >
            {(formikProps) => (
               <Form className="row gy-2 gx-3 align-items-center">
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
                  {genresList.map(item => 
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
               )}
        </Formik>
        </>
    )}