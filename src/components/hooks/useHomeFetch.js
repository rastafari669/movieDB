import {useState,useEffect} from 'react';
import {POPULAR_BASE_URL} from '../../config';


export const useHomeFetch = searchTerm =>{

    const [state,setState] = useState({movies: []});
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);

    

    //FETCHING URL DATA
    const fetchMovies = async endpoint =>{

    setError(false);
    setLoading(true);

    //at the start the endpoint will not have any 'page' so it is false
    const isLoadMore = endpoint.search('page');
    
    

    try{
        //fetching the data and waiting until it is done fetching
        const result = await (await fetch(endpoint)).json();
        console.log(result,'result');
        
        
        setState(prev =>({
         ...prev,
         movies: isLoadMore !== -1 ? [...prev.movies,...result.results] : [...result.results],//prev movies is the movies already loaded
         heroImage: prev.heroImage || result.results[7], //this means if prev.heoImage is false than go to the next expression result.results[0]
         currentPage: result.page,
         totalPages: result.total_pages
        }));

    }catch (error){

    setError(true);
    console.log(error);
    
    }

    setLoading(false)
    }

    useEffect(() =>{
        if(sessionStorage.homeState){
            console.log("Grabbing from sessionStorage");
            
            setState(JSON.parse(sessionStorage.homeState))//parsing back into an Object
            setLoading(false)
        }else{
            console.log('Grabbing from API');
            
            fetchMovies(POPULAR_BASE_URL);
        }
        
    },[])

    useEffect(() =>{
        if(!searchTerm){
            console.log('writing to session storage');
            
        sessionStorage.setItem('homeState', JSON.stringify(state))//parsing the state with the name of homeState to a json Object
        }
    },[searchTerm,state])


    return [{state,loading,error}, fetchMovies];
}