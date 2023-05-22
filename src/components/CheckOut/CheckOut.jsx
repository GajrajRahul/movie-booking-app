import React from 'react'
import { useNavigate } from 'react-router-dom'
import Summary from './Summary';
import Payment from './Payment';
import './CheckOut.css';

function CheckOut() {
    const ticketDetails = JSON.parse(sessionStorage.getItem("BookingDetails"));
    const navigate = useNavigate();
  return (
    <div className='check-out'>
      <button onClick={() => {
        navigate(-1);
      }}>Back</button>
          <h1 className="checkout-heading">Checkout</h1>
          <div className="wraper-checkout">
            <Summary bookingDetails={ticketDetails} />
            <Payment />
          </div>
    </div>
  )
}

export default CheckOut;
