import { useEffect, useState } from "react";
import { MoviesList } from ".";
import { LandingPage as  LandingPageModel} from '../models';

export default function LandingPage () {
    const [movies, setMovies] = useState<LandingPageModel>({});

useEffect(() => {
  const timerId = setTimeout(() =>
    setMovies({
      inCinemaMovies: [
        {
          id: 1,
          title: 'Spider man',
          poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Web_of_Spider-Man_Vol_1_129-1.png/250px-Web_of_Spider-Man_Vol_1_129-1.png'
        },
        {
          id: 2,
          title:'Tom and Jerry',
          poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Vitoria_-_Graffiti_%26_Murals_1127_12.JPG/250px-Vitoria_-_Graffiti_%26_Murals_1127_12.JPG'
        }
      ],
      upcomingMovies: [
        {
        id: 1,
        title: 'The pink panther',
        poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Pink_Panther.png/250px-Pink_Panther.png'
      }
    ]}), 4000)
  
  return () => clearTimeout(timerId);
})

    return (
        <>
        <h1>In Cinema Movies</h1>
        <MoviesList movies={movies.inCinemaMovies}/>
      
        <h1>Upcoming Movies</h1>
        <MoviesList movies={movies.upcomingMovies}/>
        </>
    );
}