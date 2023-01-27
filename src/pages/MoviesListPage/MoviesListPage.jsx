import { useEffect, useState } from 'react';
import { lazy } from "react";
import { getMovies } from '../../services/getMovies.service';
import { STATUS } from '../../constants/status.constants';

//const STATUS = lazy(() => import("../../constants/status.constants"));
//const getMovies = lazy(() => import("../../services/getMovies.service"));
const MovieItem = lazy(() => import("../../components/Movies/MovieItem"));
const MovieLoader = lazy(() => import("../../components/Movies/MovieLoader"));
const NotFound = lazy(() => import("../../components/NotFound/NotFound"));

//import { NotFound } from '../../components/NotFound/NotFound';
//import { MovieItem } from '../../components/Movies/MovieItem';
//import { MovieLoader } from '../../components/Movies/MovieLoader';



const MoviesListPage = ( ) => {
  const [movies, setMovies] = useState(null);
  const [status, setStatus] = useState(STATUS.idle);
  
  const fetchData = async () => {
    setStatus(STATUS.loading);
    try {
      const data = await getMovies();
      setMovies(data);
      setStatus(STATUS.success);
    } catch (error) {
      console.log(error);
      setStatus(STATUS.error);
    }
  };


  useEffect(() => {
    fetchData({ page: 1 });
  }, []);

 

  return (
    
    <>

      {(status === STATUS.loading || status === STATUS.idle) && <MovieLoader />}

      {status === STATUS.error && <NotFound />}

      <div className="container-fluid g-0 pb-5 mb-5">
        <div className="row">
          {movies?.results.map(movie => (
            <MovieItem key={movie.id} movie={movie} path={'movies/'} />
          ))}
        </div>
      </div>

     
    </>
  );
};

export default MoviesListPage;