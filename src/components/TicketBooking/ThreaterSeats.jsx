import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TicketBooking.css';

function ThreaterSeats(props) {
  let styleSeat = props.seats.map((item, index, arr) => {
    return arr.map((c, i) => {
      return {
        seatNo: `${item}-${i}`,
        flag: false,
      }
    })
  })

  const [seatState, setSeatState] = useState([]);
  const [seatSelect, setSeatSelect] = useState(styleSeat);
  const seatsSection = (arr, row) => {
    return arr.map((item, index) => {
      return (
        <div id={`${row}-${index}`} className={`seat ${seatSelect[row][index].flag ? "seatSelect-on" : ""}`} key={"seat" + row + "" + index} onClick={(e) => {
          seatNumber(`${row}-${index}`, e.target);
        }}>{`${row}-${index}`}</div>
      )
    })
  }

  const seatNumber = (num, arg2) => {
    let seatSelect1 = seatSelect.map((i, j, arr) => {
      return i.map((l, m) => {
        return l.seatNo === num ? {...l, flag: !l.flag} : l;
      })
    })
    setSeatSelect(seatSelect1);
    setSeatState([...seatState, num]);
  }

  const navigate = useNavigate();

  const submitSeatSelected = () => {
    if(props.bookingDate === null || seatState.length <= 0) {
      props.showAlert('Please fill details!', 'danger');
      return;
    }
    let dateBooked = props.bookingDate.split("-"); // 2023-05-13
    let currDate = new Date();
    if(currDate.getFullYear() > dateBooked[0]) {
      props.showAlert('Please Enter Valid Date!', 'danger');
      // console.log("invalid date");
      return;
    }
    else if (currDate.getMonth()+1 > dateBooked[1]) {
      props.showAlert('Please Enter Valid Date!', 'danger');
      // console.log("invalid date");
      return;
    }
    else if(currDate.getDate() > dateBooked[2]) {
      props.showAlert('Please Enter Valid Date!', 'danger');
      // console.log("invalid date");
      return;
    }
    
  
    const ticketDetails = {
      seats : seatState,
      noSeats : seatState.length,
      price : 300,
      name : props.movieName,
      bookingDate : props.bookingDate
    }
    sessionStorage.setItem('BookingDetails', JSON.stringify(ticketDetails));
    navigate("/checkout");
  }
 
  return (
    <>
      <div className="seats-grid">
        <div className="seat-row">{seatsSection(props.seats, 0)}</div>
        <div className="seat-row">{seatsSection(props.seats, 1)}</div>
        <div className="seat-row">{seatsSection(props.seats, 2)}</div>
        <div className="seat-row">{seatsSection(props.seats, 3)}</div>
        <div className="seat-row">{seatsSection(props.seats, 4)}</div>
        <div className="seat-row">{seatsSection(props.seats, 5)}</div>
        <div className="seat-row">{seatsSection(props.seats, 6)}</div>
        <div className="seat-row">{seatsSection(props.seats, 7)}</div>
        <div className="seat-row">{seatsSection(props.seats, 8)}</div>
        <div className="seat-row">{seatsSection(props.seats, 9)}</div>
        <button className="btn-seat" onClick={submitSeatSelected}>Submit</button>
      </div>
    </>
  )
}

export default ThreaterSeats
