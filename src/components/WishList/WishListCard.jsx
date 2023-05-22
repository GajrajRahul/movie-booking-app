import React from 'react';
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './WishList.css';

function WishListCard({ poster, title, rating, runtime, movie_type, overview, price }) {
    const createGenres = (arr) => {
        if(arr) {
            return arr.map((item, index) => {
                return <span key={`span${index}`}>{item.name}</span>
            })
        }
    }
    
    const navigate = useNavigate();
    const bookMovie = () => {
        localStorage.setItem('bookTheMovie', title);
        navigate('/bookingDetails');
    }

    return (
        <div className='wraper-card'>
            <div className="card-left-container">
                <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt="" />
            </div>
            <div className="wrap-wishlist-data">
                <h3>{title}</h3>
                <p>
                    <FaStar />{Math.round(rating * 10) / 10}
                </p>
                <p>{runtime}</p>
                <div>{createGenres(movie_type)}</div>
                <p>{overview}</p>
                <button type="button" className='book-ticket-btn' onClick={bookMovie}>Book Tickets</button>
                {/* <p><span className="rupee">&#8377;</span>{price}</p>
                <div>
                    <button type="button">Remove From Wishlist</button>
                </div> */}
            </div>
        </div>
    )
}

export default WishListCard;
