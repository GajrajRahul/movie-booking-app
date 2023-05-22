import '../style/App.css'
import HomeScreen from './HomeScreen/HomeScreen'
import UserLogin from './UserLoginForm/UserLogin'
import UserSignUp from './UserLoginForm/UserSignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WishList from './WishList/WishList';
import UserInfoPage from './UserLoginForm/UserInfoPage';
import TicketBooking from './TicketBooking/TicketBooking';
import CheckOut from './CheckOut/CheckOut';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><HomeScreen /></>} />
          <Route path='/signup' element={<UserSignUp />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/info' element={<UserInfoPage />} />
          <Route path='/wishlist' element={<WishList />}/>
          <Route path='/bookingDetails' element={<><TicketBooking /></>}/>
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
