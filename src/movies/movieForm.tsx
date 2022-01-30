import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import { Button } from "../shared";
import * as Yup from 'yup';
import { CheckboxField, DateField, TextField } from "../forms";
import { ActorTypeAhead, Genre, MovieForm as MovieFormModel, MultiSelectedItem, Theater } from "../models";
import ImageField from "../forms/imageField";
import MultiSelecField from "../forms/multiSelectField";
import { useState } from "react";
import { ActorsTypeAhead } from "../actors";
import MarkdownField from "../forms/markdownField";

interface MovieFormProps {
    model: MovieFormModel;
    onSubmit(values: MovieFormModel, helpers: FormikHelpers<MovieFormModel>): void;
    selectedGenres: Genre[];
    nonSelectedGenres: Genre[];
    selectedTheaters: Theater[];
    nonSelectedTheaters: Theater[];
    selectedActors: ActorTypeAhead[]
}

export default function MovieForm (props: MovieFormProps) {
    const [selectedGenres, setSelectedGenres] = useState<MultiSelectedItem[]>(mapToMultiplsSelectedItemModel(props.selectedGenres));
    const [nonSelectedGenres, setNonSelectedGenres] = useState<MultiSelectedItem[]>(mapToMultiplsSelectedItemModel(props.nonSelectedGenres));
    const [selectedTheaters, setSelectedTheaters] = useState<MultiSelectedItem[]>(mapToMultiplsSelectedItemModel(props.selectedTheaters));
    const [nonSelectedTheaters, setNonSelectedTheaters] = useState<MultiSelectedItem[]>(mapToMultiplsSelectedItemModel(props.nonSelectedTheaters));
    const [selectedActors, setSelectedActors] = useState<ActorTypeAhead[]>(props.selectedActors);

    function mapToMultiplsSelectedItemModel (items: {id?: number, name: string}[]): MultiSelectedItem[] {
        return items.map(item => {
            return {key: item.id || -1, value: item.name}
        });

    }

    return (
        <>
        <Formik initialValues={props.model}
        onSubmit={(values, helpers) => {
            values.genresIds = selectedGenres.map(item => item.key);
            values.theatersIds = selectedTheaters.map(item => item.key);
            values.actors = selectedActors;

            props.onSubmit(values, helpers);
        }}
        validationSchema={Yup.object(
            {
                title: Yup.string().required('This field is required').firstLetterUppercase(),
            }
        )}
        >
            {(formikProps) => (
                 <Form>
                 <TextField fieldLabel="Title" fieldName="title" />
                 <TextField fieldLabel="Trailer" fieldName="trailer" />
                 <CheckboxField fieldLabel="In theaters" fieldName="inTheaters" />
                 <DateField fieldLabel="Release date" fieldName="releaseDate" />
                 <MarkdownField fieldLabel="Summary" fieldName="summary" />
                 <ImageField fieldLabel="Poster" fieldName="poster" imgUrl={props.model.posterUrl}/>
                 <MultiSelecField fieldLabel="Genres" selectedItems={selectedGenres} nonSelectedItems={nonSelectedGenres} onChange={
                     (selectedItems, nonSelectedItems) => {
                         setSelectedGenres(selectedItems);
                         setNonSelectedGenres(nonSelectedItems);
                     }} />

                <MultiSelecField fieldLabel="Theaters" selectedItems={selectedTheaters} nonSelectedItems={nonSelectedTheaters} onChange={
                                    (selectedItems, nonSelectedItems) => {
                                        setSelectedTheaters(selectedItems);
                                        setNonSelectedTheaters(nonSelectedItems);
                                    }} 
                                    />
                 <ActorsTypeAhead
                  fieldLabel="Actors"
                   actors={selectedActors}
                   onAdd={actors => setSelectedActors(actors)}
                   listUI={actor =>(
                       <>
                       <span>{`${actor.name} / `}</span>
                       <input
                        type="text"
                        placeholder="Character"
                        value={actor.character}
                         onChange={e => {
                             const index = selectedActors.findIndex(item => item.id === actor.id);
                             const actors = [...selectedActors];
                             actors[index].character = e.currentTarget.value;
                             setSelectedActors(actors);
                         }} 
                          />
                        </>
                   )}
                   onRemove={actor => {
                       const actors = selectedActors.filter(item => item.id !== actor.id);
                       setSelectedActors(actors);
                   } } 
                   />                    

                  <Button disabled={formikProps.isSubmitting} type="submit">Save changes</Button>
                  <Link className="btn btn-secondary" to="/movies">Cancel</Link>
              </Form>
            )} 
        </Formik>
        </>
    );
}
