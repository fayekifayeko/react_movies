import { MovieForm } from "../models";

export function convertMovieToFormData(movie: MovieForm): FormData {
    var formData = new FormData();
    formData.append('title', movie.title);

    if(movie.trailer) formData.append('trailer', movie.trailer);

    if(movie.inTheaters) formData.append('inTheaters', movie.inTheaters.toString());

    if(movie.poster) formData.append('poster', movie.poster);
    if(movie.releaseDate) formData.append('releaseDate', formatDate(movie.releaseDate));
    if(movie.summary) formData.append('summary', movie.summary);
    if(movie.theatersIds) formData.append('theatersIds', JSON.stringify(movie.theatersIds));
    if(movie.genresIds) formData.append('genresIds',JSON.stringify(movie.genresIds));
    if(movie.actors) formData.append('actors',JSON.stringify(movie.actors));


    return formData;

}

function formatDate(date: Date){

    const format = Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        {value: month},,
        {value: year},,
        {value: day}
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}`;
}