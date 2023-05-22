import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './MovieDetails.css';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function MovieDetails({ showAlert, movie_id, poster, title, rating, flag, setFlag }) {
    const [data, setData] = useState([]);
    const [movieType, setMovieType] = useState([]);
    const [price, setPrice] = useState(Math.floor(Math.random() * (300 - 250 + 1)) + 250);
    const navigate = useNavigate();

    let movieData = async () => {
        let url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=ca25ef1c96f2c2f564eaf7149c9e333c&language=en-US`;
        let data = await fetch(url)
        let parsedData = await data.json();
        setData(parsedData);
        setMovieType(parsedData.genres);
    }
    useEffect(() => {
        movieData();
    }, [flag])

    const user = JSON.parse(localStorage.getItem('myUser'));

    const addMovie = () => {
        if (user) {
            // const docRef = await addDoc(collection(db, "movies"), {
            //     title: { title },
            //     rating: { rating },
            //     movieInfo: { data },
            //     movieType: { movieType },
            //     price: { price },
            // });
            const existingWishlist = JSON.parse(localStorage.getItem(user.email)) || [];
            let myData = [];
            if (existingWishlist.length > 0) {
                myData = existingWishlist.filter((e) => e.title == data.title)
            }
            if (myData.length > 0) {
                showAlert('Movie is already in your wishlist!', 'warning');
                myData = [];
                return;
            }
            else {
                const newWishList = [...existingWishlist, data];
                localStorage.setItem(user.email, JSON.stringify(newWishList));
                showAlert('Movie added to wishlist!', 'success');
            }
        }
        else {
            showAlert('Please Login First!', 'danger');
        }
    };

    const bookMovie = () => {
        if (user) {
            localStorage.setItem('bookTheMovie', title);
            navigate('/bookingDetails');
        }
        else {
            showAlert('Please Login First!', 'danger');
        }
    }

    return (
        <>
        <div className='movie-details'>
            <div className="movie-styles">
                <div className="movie-left-container">
                    <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt="" />
                </div>
                <div className="movie-right-container">
                    <div className='close-details'><span onClick={() => setFlag(false)}>X</span></div>
                    <h3>{title}</h3>
                    <div>
                        <FaStar />{Math.round(rating * 10) / 10}
                    </div>
                    <div className="movie-card-text">
                        <span>{data.runtime} minutes</span>
                        {movieType && movieType.map((movie_type, index) => <span key={'span' + index}>{movie_type.name}</span>)}
                    </div>
                    <p>{data.overview}</p>
                    <p>
                        <span className="rupee">&#8377;</span>
                        {price}
                    </p>
                    <div className="buy-wishlist">
                        <button type="button" onClick={bookMovie}>Book Tickets</button>
                        <button type="button" onClick={addMovie}>Wishlist</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default MovieDetails;
