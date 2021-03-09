import React from 'react';
import {useMovieFetch} from './hooks/useMovieFetch';


//components
import {Navigation} from './elements/Navigation';
import {MovieInfo} from './elements/MovieInfo';
import {MovieInfoBar} from './elements/MovieInfoBar';
import {Actor} from './elements/Actor';
import {Grid} from './elements/Grid';
import {Spinner} from './elements/Spinner';

export const Movie = ({movieId}) => {

    const[state,loading,error] = useMovieFetch(movieId);
    
    
if(error) return <div>Something went wrong...</div>;
if(loading) return <Spinner/>;

    return (

        <>

           <Navigation movie={state.original_title}/>
           <MovieInfo movie={state}/>
           <MovieInfoBar time={state.runtime} budget={state.budget} revenue={state.revenue}/>
           <Grid header="Actors">
               {state.actors.map( actor =>(
                   <Actor key={actor.credit_id} actor={actor}/>
               ))}
               
           </Grid>
           
           
           

           
        </>
    )
}
