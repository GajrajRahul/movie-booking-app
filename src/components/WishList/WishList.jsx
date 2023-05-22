import React, { useEffect, useState } from 'react';
import './WishList.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../Navbar/Navbar';
import WishListCard from './WishListCard';

function WishList() {
    const [showWishList, setShowWishList] = useState([]);
    const user = JSON.parse(localStorage.getItem('myUser'));

    const getMovies = async () => {
        try {
            if(user) {
                // const querySnapshot = await getDocs(collection(db, "movies"));
                const existingWishlist = JSON.parse(localStorage.getItem(user.email));
                // if(!existingWishlist || querySnapshot.docs.length === 0) {
                //     setShowWishList([]);
                // }
                if(!existingWishlist) {
                    setShowWishList([]);
                }
                else {
                    // const movies = querySnapshot.docs.map((doc) => doc.data());
                    setShowWishList(existingWishlist);
                }
            }
        }
        catch (error) {
            console.error("Error getting movies: ", error);
        }
    }
    useEffect(() => {
        getMovies();
    }, [])

    return (
        <>
            <Navbar />
            <div className="wrapper-wishlist">
                {((showWishList.length === 0 || !user) ? <h1>No data added to Wishlist</h1> : showWishList.map((item, index) => {
                    return <div className="wishlist-card" key={`wish${index}`}>
                        <WishListCard
                            poster={item.poster_path}
                            title={item.title}
                            rating={item.vote_average}
                            runtime={item.runtime}
                            movie_type={item.genres}
                            overview={item.overview}
                            price={100}
                        />
                    </div>
                }))}
            </div>
        </>
    )
}

export default WishList;
