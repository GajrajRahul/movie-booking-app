import React, { useState } from 'react';
import { BsShieldLock } from "react-icons/bs";
import "./UserStyle.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userError, setUserError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            const myLocalUser = {
                email: email,
                name: email.substring(0, email.indexOf('@'))
            }
            localStorage.setItem('myUser', JSON.stringify(myLocalUser));
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setUserError(errorMessage);
        })
        setUserError('');
        setEmail('');
        setPassword('');
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-logo">
                    <BsShieldLock style={{ fontSize: "2rem" }} />
                </div>
                <h3 className="user-heading">Login</h3>
                <input
                    type="email"
                    placeholder="Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {userError && <p style={{color: 'red'}}>{userError}</p>}
                <NavLink to='/signup'>
                    <p className="account-check">
                        New User? SignUp
                    </p>
                </NavLink>
            </form>
        </>
    )
}

export default UserLogin;
