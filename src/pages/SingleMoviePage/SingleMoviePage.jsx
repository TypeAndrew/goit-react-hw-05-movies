import { useEffect, useState,  } from 'react';
import { useLocation } from "react-router-dom";
import { STATUS } from '../../constants/status.constants';
import { useParams, Link, Outlet } from 'react-router-dom';
import { lazy } from "react";
import { getDetailsMovie } from '../../services/getDetailsMovie';
//import { Genres } from '../../components/Genres/Genres'
//import { BackLink } from '../../components/BackLink/BackLink';
//import { Loader } from '../../components/Loader/Loader';

const Genres = lazy(() => import("../../components/Genres/Genres"));
const BackLink = lazy(() => import("../../components/BackLink/BackLink"));
//const getDetailsMovie = lazy(() => import("../../services/getDetailsMovie"));
const Loader = lazy(() => import("../../components/Loader/Loader"));

const SingleMoviePage = () => {
  // TODO change to dynamic value

  const { movieId } = useParams();
 
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState(STATUS.idle);

  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/movies';

  useEffect(() => {
    
      const fetchData = async () => {
        setStatus(STATUS.loading);
        try {
          const data = await getDetailsMovie(movieId);
          setMovie(data);
          setStatus(STATUS.success);
        } catch (error) {
          console.log(error);
          setStatus(STATUS.error);
        }
      };
      fetchData();
  }, [movieId]);

  if (status === STATUS.loading) {
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
          style={{ maxHeight: '300px', width: '100%', objectFit: 'cover' }}
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
          <ul>
            <li>
              <Link to="cast" className="btn btn-primary my-4" state={{ from: location.state?.from ?? '/movies' }}>
              cast
              </Link>
            </li>
            <li>
              <Link to="reviews" className="btn btn-primary my-4" state={{ from: location.state?.from ?? '/movies' }}>
              reviews
              </Link>
            </li>  
        </ul>
        </div>
      <Outlet />
      </>
    )
  );
};

export default SingleMoviePage;
 