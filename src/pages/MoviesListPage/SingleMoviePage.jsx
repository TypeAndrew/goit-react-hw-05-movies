import { useEffect, useState,  } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useParams, Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Genres } from '../../components/Movies/Genres'
import { BackLink } from '../../components/Movies/BackLink';
import { Loader } from '../../components/Loader/Loader';

export const SingleMoviePage = () => {
  // TODO change to dynamic value

  const { movieId } = useParams();
 
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/products";
  useEffect(() => {
    setIsLoading(true);

    // TODO create service
    axios.get('https://api.themoviedb.org/3/movie/' + movieId+'?api_key=c491b5b8e2b4a9ab13619b0a91f8bb41')
      .then(({ data }) => setMovie(data))
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => setIsLoading(false));
  }, [movieId]);

  if (isLoading) {
    return <Loader />;
  }


  return (
    movie && (
      <>
        <BackLink to={backLinkHref}>Back</BackLink>
        <div className={'movieCard'}>
        <img
          src={'https://image.tmdb.org/t/p/original/'+movie.backdrop_path}
          alt={movie.title}
          className="img-fluid mb-4"
          style={{ maxHeight: '600px', width: '100%', objectFit: 'cover' }}
        />
          <div className={'movieCardtitle'}>
            <h1 className="mb-5">{movie.title}</h1>
            <p>user score: {movie.vote_average }%</p>
            <p>overview:</p>
            <p>{movie.overview}</p>
            <p>genres:</p>
              <Genres data={movie.genres} />
          </div>
        </div>
        <div >
          <Link to="cast" className="btn btn-primary my-4">
          cast
          </Link>
          <Link to="reviews" className="btn btn-primary my-4">
          reviews
        </Link>

        </div>
      <Outlet />
      </>
    )
  );
};


 