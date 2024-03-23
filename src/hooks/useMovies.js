import { useCallback, useMemo, useRef, useState } from 'react';
import { searchMovies } from '../services/movies';
export function useMovies({query, sortTitle, sortYear}){
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null)
    const previousSearch = useRef(query)


    const getMovies = useCallback(async ({query}) =>{
        if(query === previousSearch.current) return

        try{
            setLoading(true)
            setError(null)
            const newMovies = await searchMovies({query})
            setMovies(newMovies)
        }catch (e){
            setError(e.message)
        }finally{
            setLoading(false)
        }
    },[])

    const sortedMovies = useMemo(()=>{
        if(sortTitle && !sortYear){
            return [...movies].sort((a,b) => a.title.localeCompare(b.title))
        }else if(sortYear && !sortTitle){
            return [...movies].sort((a,b) => a.year.localeCompare(b.year))
        }else if(sortTitle && sortYear){
            const sortedOnce =  [...movies].sort((a,b) => a.title.localeCompare(b.title))
            return [...sortedOnce].sort((a,b) => a.year.localeCompare(b.year)) 
        }   
        else{
            return movies
        }
        
    },[sortTitle,movies,sortYear]) 

    return {movies: sortedMovies, getMovies, loading}
}


