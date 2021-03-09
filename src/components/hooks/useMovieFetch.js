import {useCallback,useState,useEffect} from 'react';
import {API_KEY,API_URL} from '../../config';


export const useMovieFetch = movieId =>{

    const [state,setState] = useState({});
    const [ loading,setLoading] = useState(true);
    const [error,setError] = useState(false);


    //this function will change only when the moviId changed
    const fetchData = useCallback(async () =>{

        setError(false);
        setLoading(true);

        try{

         const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
         const result = await(await fetch(endpoint)).json();

         

         const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
         const creditsResult = await(await fetch(creditsEndpoint)).json();

       

         const directors = creditsResult.crew.filter(
             member => member.job === 'Director'
         );

         setState({
             ...result,
             actors: creditsResult.cast,
             directors: directors

         })

         
         
        }catch(error){
            setError(true);
        }
        setLoading(false);
    
    },[movieId])

    useEffect(() =>{
        if(localStorage[movieId]){
            console.log('Grabbing from local storage');
            
            setState(JSON.parse(localStorage[movieId]));
            setLoading(false);
        }else{
            console.log("Grabbing from API");
            
            fetchData();
        }
        
    },[fetchData])
    
//SAVING TO THE LOCAL STORAGE
    useEffect(() =>{
        localStorage.setItem(movieId,JSON.stringify(state));
    },[movieId,state])

    return [state,loading,error]
}