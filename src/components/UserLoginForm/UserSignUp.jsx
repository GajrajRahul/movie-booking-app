import React, { useState } from 'react';
import { BsShieldLock } from "react-icons/bs";
import "./UserStyle.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

function UserSignUp() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userError, setUserError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user;
                const myLocalUser = {
                    email: email,
                    name: userName,
                }
                localStorage.setItem('myUser', JSON.stringify(myLocalUser))
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setUserError(errorMessage);
            })

            setUserError('');
            setUserName('');
            setEmail('');
            setPassword('');
    }

    return (
        <>
            <div className="wraper-div signup-form">
                <form onSubmit={handleSubmit} className="login-form">

                    <div className="login-logo">
                        <BsShieldLock style={{ fontSize: "2rem" }} />
                    </div>

                    <h3 className="user-heading">Sign Up</h3>

                    <input type="text" placeholder='User Name*' value={userName} onChange={(e) => setUserName(e.target.value)} />

                    <input type="email" placeholder='Email*' value={email} onChange={(e) => setEmail(e.target.value)} />

                    <input type="password" placeholder="Password*" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type='submit'>Sign Up</button>
                    {userError && <p style={{color: 'red'}}>{userError}</p>}
                    <NavLink to='/login'>
                        <p className="account-check">
                            Already have an account? Login
                        </p>
                    </NavLink>
                </form>

            </div>
        </>
    )
}

export default UserSignUp;
