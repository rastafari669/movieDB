import React, { useState} from 'react';
import {POSTER_SIZE,BACKDROP_SIZE, IMAGE_BASE_URL,POPULAR_BASE_URL,SEARCH_BASE_URL} from '../config';


//import components
import {HeroImage} from './elements/HeroImage';
import {Spinner} from './elements/Spinner';
import {SearchBar} from './elements/SearchBar';
import {MovieThumb} from './elements/MovieThumb';
import {Grid} from './elements/Grid';

import {LoadMoreBtn} from './elements/LoadMoreBtn';


//custom hook

import {useHomeFetch} from './hooks/useHomeFetch';

import NoImage from './images/no_image.jpg';



export const Home = () => {

    const [searchTerm,setSearchTerm] = useState('');
    
    //CUSTOM HOOK
  const  [{state,loading,error}, fetchMovies] = useHomeFetch(searchTerm);//sending the serachTerm to the useHomeFetch hook

  

  const searchMovies = search =>{
      //CHECKING IF THE USER ENTERED A STRING INPUT
  const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;

  setSearchTerm(search);
  fetchMovies(endpoint);

  }

  const loadMoreMovies = () =>{

      const searchEndPoint = `${SEARCH_BASE_URL}${searchTerm}&page=${state.currentPage + 1}`;
      const popularEndpoint = `${POPULAR_BASE_URL}&page=${state.currentPage + 1}`;

// checking if  searchTerm if empty if yes load popular movies  and clicking the load more movies will load the next page
      const endpoint = searchTerm ? searchEndPoint : popularEndpoint;

      fetchMovies(endpoint);

  }

  console.log(state);

//in the first render the state will be empty no DATA so it wont recognize any property
  if(error) return <div>Something went wrong...</div>
  if(!state.movies[0]) return <Spinner/>
  
    

    return(
        <>
        { !searchTerm &&(
        
            <HeroImage 
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
            title={state.heroImage.original_title}
            text={state.heroImage.overview}/>
        )

        }
            <SearchBar callback={searchMovies}/>

            <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
             {state.movies.map(movie => (
                 <MovieThumb
                 key={movie.id}
                 clickable ={movie.poster_path ? true : false}
                 image={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                 : NoImage }
                 movieId={movie.id}
                 movieName={movie.original_title}
                 />
             ))}
            </Grid>
            {/* if loading is true return Spinner */}
            {loading  &&  <Spinner/>}
            {/* Button will not show at the last page */}
            {state.currentPage < state.totalPages  && !loading &&(
                <LoadMoreBtn text={"Load More"} callback={loadMoreMovies}/>
            )}
            
            
        </>
    )

}

