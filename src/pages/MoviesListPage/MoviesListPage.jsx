import { useEffect, useState } from 'react';

import { NotFound } from '../../components/NotFound/NotFound';
import { MovieItem } from '../../components/Movies/MovieItem';
import { MovieLoader } from '../../components/Movies/MovieLoader';
import { STATUS } from '../../constants/status.constants';
import { getMovies } from '../../services/movies.services';

export const MoviesListPage = ( ) => {
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

//export default MoviesListPage;