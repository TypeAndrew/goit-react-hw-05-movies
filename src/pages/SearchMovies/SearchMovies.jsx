import { useSearchParams } from "react-router-dom";
import {  useState, useEffect } from 'react';
import { lazy } from "react";
import { searhMoviesByName } from '../../services/searhMoviesByName.service';
import { STATUS } from '../../constants/status.constants';

const MovieItem = lazy(() => import("../../components/Movies/MovieItem"));
const Loader = lazy(() => import("../../components/Loader/Loader"));
//const searhMoviesByName = lazy(() => import("../../services/searhMoviesByName.service"));
//const STATUS = lazy(() => import("../../constants/status.constants"));
//import { MovieItem } from '../../components/Movies/MovieItem';
//import { Loader } from '../../components/Loader/Loader';

const SearchMovies = () => {
  const [video, setViedos] = useState(undefined);
  const [value, setValue] = useState('');
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
  
    if (query !== null) {
      fetchData();
      }
    },[query])
 

   

  const handleSubmit = (event) => {
    event.preventDefault();

    setSearchParams({ query: value })
  };  

   const handleChange = event => {
    const { value } = event.target;
    setValue(value);
 
 

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
          type="text"y
          className="form-control"
         placeholder="search..."
         
         value={value == null ? '' : value}
         onChange={handleChange}  

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

export default SearchMovies;