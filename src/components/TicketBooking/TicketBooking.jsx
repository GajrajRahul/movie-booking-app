import React, { useEffect, useState } from 'react'
import TheaterScreen from './TheaterScreen';
import ThreaterSeats from './ThreaterSeats';
import './TicketBooking.css';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alerts/Alert';

const theaterName = ["PVR Cinema", "Metro INOX Cinema", "Cinepolis"];
const showTime = ["10:15", "12:45", "3:15", "5:45"];
const theaterSeats = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function TicketBooking() {

    const [date, setDate] = useState(null);
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

    const movieName = localStorage.getItem('bookTheMovie');
    const navigate = useNavigate();

    const options = (arr, name) => {
        return arr.map((item, index) => {
            return (
                <option value={index} key={name + index}>{item}</option>
            )
        })
    }

    const dateOfBooking = (e) => {
        setDate(e.target.value);
    }


    return (
        <div className='book'>
            <Alert alert={alert}/>
            <button onClick={() => {
                navigate(-1);
            }}>Back</button>
            <br />
            <h3 className='book-ticket'>Book Ticket</h3>
            <p>
                <span className="heading">Movie: </span>
                {movieName}
            </p>

            <div className="Booking-nav">
                <div className="border-class">
                    <select className="select-theater">
                        {options(theaterName, "theater")}
                    </select>
                </div>
                <div className="border-class">
                    <input type="date" onChange={dateOfBooking} />
                </div>
                <div className="border-class">
                    <select className="select-theater">
                        {options(showTime, "time")}
                    </select>
                </div>
            </div>
            <div className="ticket">
                <TheaterScreen />
                <div className="seats-section">
                    <ThreaterSeats bookingDate={date} seats={theaterSeats} movieName={movieName} showAlert={showAlert}/>
                </div>
            </div>
        </div>
    )
}

export default TicketBooking
