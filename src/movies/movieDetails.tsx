import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { moviesApiUrl, ratingsApiUrl } from "../endpoints";
import { Genre, Theater, Actor, Coordinate } from "../models";
import { Loader, Map, Rating } from "../shared";

interface MovieDetailsProps {
    id: number;
    title: string;
    poster: string;
    inTheaters: boolean;
    releaseDate: Date;
    trailer: string;
    genres: Genre[];
    theaters:  Theater[];
    actors: Actor[];
    summary?: string;
}

export default function MovieDetails(){

    const {id} : any = useParams();
    const [movieDetails, setMovieDetails] = useState<MovieDetailsProps>();

    useEffect(() => {
        axios.get(`${moviesApiUrl}/${id}`)
        .then((resp: AxiosResponse<MovieDetailsProps>) => {
            resp.data.releaseDate = new Date(resp.data.releaseDate);
            setMovieDetails(resp.data);
        })
    }, [id])

    function generateEmbededUrl(url: string): string {
        if(!url) return '';
        let videoId = url.split('v=')[1];
        const ampersandPos = videoId.indexOf('&');
        if(ampersandPos !== -1) {
            videoId = videoId.substring(0, ampersandPos);
        }

        return `https://www.youtube.com/embed/${videoId}`;
    }

    function generateCoordinates(): Coordinate[]  {
        if(movieDetails?.theaters) {
            return movieDetails?.theaters?.map(item => (
                {lat: item.langitude, lng: item.longitude, name: item.name}
            ))
        }

        return [];
       
    }

    
    function handleRateChange(rate: number) {
        axios.post(ratingsApiUrl, {rating: rate, movieId: id})
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Rating received'
            })
        })
    }

    return(
        movieDetails
         ? 
         <>
         <h2>{movieDetails.title} ({movieDetails.releaseDate.getFullYear()})</h2>
         {movieDetails.genres.map(item =>
             <Link
              key={item.id}
               to={`/movies/filter?genreId=${item.id}`} 
               className="btn btn-primary btn-sm rounded-pill"
               style={{marginRight: '1rem'}}
               >
                   {item.name}
                   </Link>)} | {movieDetails.releaseDate.toDateString()} | Your vote: <Rating maxValue={5} selectedValue={0} onChange={handleRateChange} />
                   <div style={{display: 'flex', marginTop: '1rem'}}>
                       <img
                        src={movieDetails.poster}
                        alt="Poster"
                        style={{width: '300px', height: '500px', marginRight: '1rem'}}                      
                        />
                        {movieDetails.trailer ?
                        <iframe
                        src={generateEmbededUrl(movieDetails.trailer)}
                        title="Youtube Trailer"
                        width={500}
                        height={500}
                        frameBorder={0}
                        allowFullScreen
                        allow="autoplay;gyroscope;picture-in-picture;encrypted-media"
                        />: null}
                   </div>
                   {movieDetails.summary ? 
                   <div style={{marginTop: '1rem'}}>
                   <h3>Summary</h3>
                   <ReactMarkdown>{movieDetails.summary}</ReactMarkdown>
                   </div>
                : null}
                {movieDetails.actors ? 
                <div style={{display: 'flex', flexDirection: 'column', marginTop: '1rem'}}>
                 <h3>Actors</h3>
                    {movieDetails.actors.map(item => (
                        <div key={item.id}>
                        <img src={item.picture as string} alt="Pic" style={{width: '50px', height: '50px', marginRight: '1rem'}} />
                        <span>{item.name}</span>
                        <span style={{marginLeft: '1rem', marginRight: '1rem'}}>.....</span>
                        <span>{item.character || 'No character available'}</span>
                        </div>
                    ))}
                </div>
                : null}
                {!!movieDetails.theaters ? 
                <div style={{marginTop: '1rem'}}>
                <h3>Theaters</h3>
                <Map coordinates={generateCoordinates()} readOnlyMode />
                </div> 
                : null
            }
         </>
        : <Loader />
    );

}