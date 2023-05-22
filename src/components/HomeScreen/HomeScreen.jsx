import React, { useEffect, useState } from 'react';
import './HomeScreen.css';
import MovieCard from '../Movie/MovieCard';
import MovieDetails from '../Movie/MovieDetails';
import Navbar from '../Navbar/Navbar';
import Alert from '../Alerts/Alert';

function HomeScreen() {
  const [flag, setFlage] = useState(false);
  const [movieObj, setMovieObj] = useState([]);
  const [data, setData] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [currData, setCurrData] = useState([]);
  const [genreTitle, setGenreTitle] = useState('Now Playing');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  }

  const url1 = 'https://api.themoviedb.org/3/genre/movie/list?api_key=ca25ef1c96f2c2f564eaf7149c9e333c&language=en-US';
  let getGenresData = async () => {
    let data = await fetch(url1)
    let parsedData = await data.json()
    setData(parsedData.genres);
  }

  useEffect(() => {
    getGenresData();
  }, [])

  const url2 = 'https://api.themoviedb.org/3/trending/all/day?api_key=ca25ef1c96f2c2f564eaf7149c9e333c';

  let trendingMovieData = async () => {
    if (currData.length === 0) {
      let data = await fetch(url2)
      let parsedData = await data.json()
      setMovieData(parsedData.results)
      setCurrData(parsedData.results)
    }
  }

  useEffect(() => {
    trendingMovieData();
  }, [currData])

  function clickHandler(e) {
    let id = data.filter((d) => d.name == e.name)
    let genreId = id[0].id;

    let sortedData = movieData.filter((movie) => movie.genre_ids.includes(genreId))
    setCurrData(sortedData);
    setGenreTitle(e.name);
  }

  const searchMovie = (movieSearch) => {
    const searchMovieApiCall = async () => {
      const moviesData = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ca25ef1c96f2c2f564eaf7149c9e333c&language=en-US&query=${movieSearch}&page=1&include_adult=false`)

      const parsedMovieData = await moviesData.json();
      setCurrData(parsedMovieData.results);
    }
  
    if(movieSearch.length !== 0) {
      searchMovieApiCall();
    }
  }

  return (
    <div>
      <Navbar searchMovie={searchMovie} />
      <Alert alert={alert}/>
      <div className={flag ? 'main-container xyz' : 'main-container'}>
        <div className="genres-container">
          <h2>Genres</h2>
          <ul>
            {data.map((ele) =>
              <li key={ele.id} onClick={() => clickHandler(ele)}>{ele.name}</li>
            )}
          </ul>
        </div>

        <div className="now-playing-container">
          <h2>{genreTitle}</h2>
          <div className="movie-container">
            {currData.map((movie) => {
              return <div className={flag ? 'movie-card xyz' : 'movie-card'} key={movie.id} onClick={(e) => {
                e.preventDefault();
                setFlage(true);
                setMovieObj(movie)
              }}>
                <MovieCard
                  movie_id={movie.id}
                  poster={movie.poster_path}
                  title={(movie.title) ? movie.title : movie.name}
                  lang={movie.original_language}
                  rating={movie.vote_average} />
              </div>
            })}
          </div>
        </div>
      </div>
      {flag && <div className='movie-details-container'>
        <MovieDetails
          showAlert={showAlert}
          movie_id={movieObj.id}
          poster={movieObj.poster_path}
          title={(movieObj.title) ? movieObj.title : movieObj.name}
          rating={movieObj.vote_average}
          flag={flag}
          setFlag={setFlage} />
      </div>}
    </div>
  )
}

export default HomeScreen;
