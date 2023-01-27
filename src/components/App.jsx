import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import styled from "styled-components";
import { lazy, Suspense } from "react";
//import { MoviesListPage } from '../pages/MoviesListPage/MoviesListPage';
//import { SearchMovies } from '../pages/SearchMovies/SearchMovies';
//import { SingleMoviePage } from '../pages/SingleMoviePage/SingleMoviePage' ;
//import { Header } from './Header/Header';
//import { Reviews } from './Reviews/Reviews'
//import { Cast } from './Cast/Cast'

const MoviesListPage = lazy(() => import("../pages/MoviesListPage/MoviesListPage"));
const SearchMovies = lazy(() => import("../pages/SearchMovies/SearchMovies"));
const SingleMoviePage = lazy(() => import("../pages/SingleMoviePage/SingleMoviePage"));
const Header = lazy(() => import("./Header/Header"));
const Reviews = lazy(() => import("./Reviews/Reviews"));
const Cast = lazy(() => import("./Cast/Cast"));

const StyledLink = styled(NavLink)`
  color: blue;

  &.active {
    color: orange;
  }
`;

export const App = () => {
  return (
    
    <BrowserRouter basename='goit-react-hw-05-movies' >
      <>
        <Suspense fallback={<div>Loading...</div>}>
        <Header title={'Video cloud'}/>
        
        <nav>
          <StyledLink to="/">Home  </StyledLink>
          <StyledLink to="/movies">Movies</StyledLink>
        </nav>
        
        <Routes>
          <Route path="/" element={<MoviesListPage />} />
          <Route path="/movies" element={<SearchMovies />} />
          <Route path="/movies/:movieId" element={<SingleMoviePage />}>
            
            
                <Route path="cast" element={<Cast />} />
              
                <Route path="reviews" element={<Reviews />} />
              
          </Route>
        </Routes> 
        </Suspense>   
    </>
    </BrowserRouter>
  );
};
