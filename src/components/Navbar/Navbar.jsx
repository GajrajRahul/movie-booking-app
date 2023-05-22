import React, { useState } from 'react';
import './Navbar.css'
import logo from '../../media/13.png'
import { NavLink } from 'react-router-dom';

function Navbar({ searchMovie }) {
    const [movieName, setMovieName] = useState('');
    const searchTheMovieName = (e) => {
        setMovieName(e.target.value);
        searchMovie(e.target.value);
    }
    const searchMovieBtn = () => {
        searchMovie(movieName);
        setMovieName('');
    }

    const user = JSON.parse(localStorage.getItem('myUser'));

    return (
        <div className='stickyNavBar'>
            <div className='nav-bar'>
                <div className='navbar-logo'>
                    <div className='linkLogo'>
                        <NavLink to='/' className='nav-link'>
                            <img className='logo' src={logo} alt="" />
                        </NavLink>
                    </div>
                </div>

                <div className='right-side'>
                    <div className='input-container giveSameStyle'>
                        <input type='text' className='searchBar searchClass' placeholder='Search for Movies' onChange={searchTheMovieName} />
                        <button className='searchButton searchClass' onClick={searchMovieBtn}>Search</button>
                    </div>

                    <div className='login-wraper'>
                        <div className='favorite giveSameStyle'>
                            <NavLink to='/wishlist' id='favorite-icon' className='nav-link'>
                                💖
                            </NavLink></div>
                        {!user ?
                            <div className='loginInfo giveSameStyle'>
                                <NavLink to='/signup' id='user-signup' className='nav-link'>
                                    👤 Sign Up
                                </NavLink>
                            </div>
                            :
                            <div className='loginInfo giveSameStyle'>
                                <NavLink to='/info' id='user-login' className='nav-link'>
                                    👤 {user.name}
                                </NavLink>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <hr className='hr-line' />
            <br />
        </div>
    )
}

export default Navbar;
