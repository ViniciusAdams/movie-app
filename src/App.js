
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from './components/MovieList.js';
import MovieListHeading from './components/MovieListHeading.js';
import SearchBox from './components/SearchBox.js';
import AddFavourite from './components/AddFavourites';
const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue , setSearchValue] = useState ('');
  
  const getMovieRequest = async(searchValue) => {
   const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=9d31e322`;
    
   const response = await fetch (url);
    const responseJson = await response.json();
    
    if (responseJson.Search){
      setMovies (responseJson.Search);
    }
  //adding a commit
  };
  useEffect(() => {
    //Every time when the searchValue changes getMovieRequest will be called
    getMovieRequest(searchValue);
  }, [searchValue]);
  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites,movie];
    setFavourites(newFavouriteList);
  };
  return (
    <div className= 'container-fluid movie-app'>
  
      <div className='row d-felx align-item-center mt-4 mb-4'>
      <MovieListHeading heading= 'Movies'/>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />  
      </div>
      <div className='row'>
      <MovieList
       movies={movies} 
       handleFavouritesClick= {addFavouriteMovie}
       favouriteComponent = {AddFavourite} />

    </div>
    <div className='row d-felx align-item-center mt-4 mb-4'>
      <MovieListHeading heading= 'Favourites'/>
      
      </div>
      <div className='row'>
      <MovieList
       movies={favourites} 
       handleFavouritesClick= {addFavouriteMovie}
       favouriteComponent = {AddFavourite} />

    </div>
    </div>
  );
};

export default App;
