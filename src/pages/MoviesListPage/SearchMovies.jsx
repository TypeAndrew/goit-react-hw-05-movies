//import axios from 'axios';
import { useRef, useState } from 'react';
import { MovieItem } from '../../components/Movies/MovieItem';
//import { toast } from 'react-toastify';
import { searhMoviesByName } from '../../services/movies.services';
//import { Loader } from '../../components/Loader/Loader';

export const SearchMovies = () => {
  const [video, setViedos] = useState(undefined);
  const search = useRef();
  

  const fetchData = async (value) => {
    //setStatus(STATUS.loading);
    try {
      const data = await searhMoviesByName('',value,'/search/movie/');
      setViedos(data);
      //setStatus(STATUS.success);
    } catch (error) {
      console.log(error);
      //setStatus(STATUS.error);
    }
  };

  const getMovies = (value) => {

    fetchData(value);
  // TODO create service
    /*axios.get('https://api.themoviedb.org/3/search/movie/?api_key=c491b5b8e2b4a9ab13619b0a91f8bb41&query=' + value)
    .then(({ data }) => setVieo(data))
    .catch(() => {
      toast.error('Something went wrong!');
    });*/
};

  const handleSubmit = event => {
    event.preventDefault();
    const { value } = event.target[0];
    
    getMovies(value);

  };

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
          placeholder="Type to search..."
        
            ref={search}
                 />

        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <div className = "container-fluid g-0 pb-5 mb-5" >
        <div className="row">
          {video?.results.map(movie => (
            <MovieItem key={movie.id} movie={movie} path={''} search={search.current.value } />
          ))}
        </div>
      </div>
      </>
     

    )
}
