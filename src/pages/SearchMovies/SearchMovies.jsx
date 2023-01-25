import { useSearchParams } from "react-router-dom";
import {  useState, useEffect } from 'react';
import { MovieItem } from '../../components/Movies/MovieItem';
import { STATUS } from '../../constants/status.constants';
import { searhMoviesByName } from '../../services/movies.services';
import { Loader } from '../../components/Loader/Loader';

export const SearchMovies = () => {
  const [video, setViedos] = useState(undefined);
  //const [value, setValue] = useState('');
  const [status, setStatus] = useState(STATUS.idle);
 // const search = useRef(); 
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");


  useEffect(() => {
  const fetchData = async () => {
    setStatus(STATUS.loading);
    try {
      const data = await searhMoviesByName(query);
      setViedos(data);
      setStatus(STATUS.success);
    } catch (error) {
      console.log(error);
      setStatus(STATUS.error);
    }
    };
    fetchData();
    },[query])
 

   

  const handleSubmit = event => {
    event.preventDefault();
    const { value } = event.target[0];
    setSearchParams({ query: value })
  };  

   const handleChange = event => {
    const { value } = event.target;
    setSearchParams({ query: value })
 

   };

   if (status === STATUS.loading) {
    return <Loader />;
  }
  
 return (
      <>
      <form
        action="#"
        className="input-group mb-3"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="form-control"
         placeholder="search..."
         
         value={query == null ? '' : query}
         onChange={handleChange}  
         //ref={search1}
           />

        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <div className = "container-fluid g-0 pb-5 mb-5" >
        <div className="row">
          {video?.results.map(movie => (
            <MovieItem key={movie.id} movie={movie} path={''}  search={query }  />
          ))}
        </div>
      </div>
      </>
     

    )
}
