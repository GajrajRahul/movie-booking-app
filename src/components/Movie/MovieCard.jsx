import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './MovieCard.css';

function MovieCard({ movie_id, poster, title, lang, rating }) {
  return (
    <div className="card">
      <div className="movieStyleCard">
        <img className='imageCard' src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title} />
        <h4>{title}</h4>
      </div>
      <div className="rating">
        <p>{lang.charAt(0).toUpperCase() + lang.slice(1)}</p>
        <p><FaStar />{Math.round(rating * 10) / 10}</p>
      </div>
    </div>
  )
}

export default MovieCard;
