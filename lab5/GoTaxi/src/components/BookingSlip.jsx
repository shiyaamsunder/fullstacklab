import '../styles/BookingSlip.css'
import SUV from '../assets/suv.png'
import Sedan from '../assets/sedan.png'
import Odometer from '../assets/odometer.png'

export const BookingSlip = ({ from, to, carOption, price }) => {
  return (
    <div className='form__wrapper'>
      <h2>Booking Slip</h2>

      <div className='item car__type'>
        <img src={carOption.image} />

        <span>{carOption.type}</span>
      </div>
      <div className='item car__fare'>
        <img src={Odometer} />

        <span>₹ {price}</span>
      </div>

      <div className=''>
        <p> From: {from}</p>
        <p> To: {to}</p>
      </div>
    </div>
  )
}
