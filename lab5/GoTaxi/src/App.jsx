import { useState } from 'react'
import { BookingSlip, Input } from './components'

// function to calculate distance based on lat and lon
import haversine from 'haversine-distance'

import './App.css'

// Static image assets
import SUV from './assets/suv.png'
import Sedan from './assets/sedan.png'
import HB from './assets/hatchback.png'

// cities data with lat and lon
import cities from './data/cities'

function App() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [pricePerKm, setPricePerKm] = useState(15)
  const [price, setPrice] = useState(0)

  // car data
  const carOptions = [
    { value: 15, text: 'HatchBack ₹15/km', type: 'Hatchback', image: HB },
    { value: 20, text: 'Sedan ₹20/km', type: 'Sedan', image: Sedan },
    { value: 30, text: 'SUV ₹30/km', type: 'SUV', image: SUV },
  ]

  // separate Handlers for source and destination city selection
  // the reason for creating a handler is that the setting function is
  // passed into the component.
  const handleFromInputClick = (value) => {
    setFrom(value)
  }
  const handleToInputClick = (value) => {
    setTo(value)
  }

  const handleBooking = () => {
    let starting_point = fetchCity(cities, from)
    let ending_point = fetchCity(cities, to)

    if (!starting_point || !ending_point) {
      alert('Enter valid cities from the options')
      return
    }
    const distance = Math.round(
      haversine(fetchCity(cities, from), fetchCity(cities, to)) / 1000
    ) // calculating the distance

    setPrice(distance * pricePerKm)
  }

  // filtering out a single city
  const fetchCity = (arr, name) => {
    return arr.filter((c) => c.name.toLowerCase() === name.toLowerCase())[0]
  }

  return (
    <main>
      <div className='form__wrapper'>
        <h1>GoTaxi</h1>
        <Input.AutoComplete
          name='from'
          labelText='Starting Point:'
          searchValue={from}
          options={cities.filter((c) => c.name !== to)}
          onChange={(e) => setFrom(e.target.value)}
          onOptionClick={handleFromInputClick}
        />
        <Input.AutoComplete
          name='to'
          labelText='Destination'
          searchValue={to}
          options={cities.filter((c) => c.name !== from)}
          onChange={(e) => setTo(e.target.value)}
          onOptionClick={handleToInputClick}
        />

        <Input
          name='datetime'
          type='datetime-local'
          labelText='Date and Time:'
          min={new Date().toISOString().slice(0, 16)}
        />

        <Input.Combobox
          labelText='Type of car: '
          name='type'
          value={pricePerKm}
          onChange={(e) => setPricePerKm(Number(e.target.value))}
          options={carOptions}
        />

        <button
          type='button'
          onClick={handleBooking}
          disabled={from.length == 0 && to.length == 0} // enable button only if source and destintation is entered
        >
          Book
        </button>
      </div>
      {price > 0 && (
        <BookingSlip
          from={from}
          to={to}
          carOption={carOptions.filter((c) => c.value === pricePerKm)[0]}
          price={price}
        />
      )}
    </main>
  )
}

export default App
