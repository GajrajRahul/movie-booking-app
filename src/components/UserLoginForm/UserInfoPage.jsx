import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './UserInfoPage.css';

function UserInfoPage() {
  const user = JSON.parse(localStorage.getItem('myUser'));
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('myUser');
    navigate('/signup');
  }

  return (
    <>
    <Navbar />
    <div className='userInfoBox'>
      <h3 className='heading-info'>Profile</h3>
        <span className='user-name'><b>Name : </b> <span>{user.name}</span></span>
      <br />
        <span className='user-email'><b>Email : </b> <span>{user.email}</span></span>
        <br />
      <br />
      <button className='logout-btn' onClick={handleLogOut}>LogOut</button>
    </div>
    </>
  )
}

export default UserInfoPage;
