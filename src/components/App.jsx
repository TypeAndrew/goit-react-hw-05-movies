import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import styled from "styled-components";
import { Header } from './Header/Header';
import { SearchMovies } from '../pages/MoviesListPage/SearchMovies';
import { MoviesListPage } from '../pages/MoviesListPage/MoviesListPage';
import { SingleMoviePage } from '../pages/MoviesListPage/SingleMoviePage' ;

import { Reviews } from './Movies/Reviews'
import { Cast } from './Movies/Cast'
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
        <Header title={'Vieo cloud'}/>
        
        <nav>
          <StyledLink to="/">Home</StyledLink>
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
           
    </>
    </BrowserRouter>
  );
};
