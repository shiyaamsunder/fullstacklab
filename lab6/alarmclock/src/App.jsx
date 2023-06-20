import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [currentHours, setCurrentHours] = useState(0)
  const [currentMinutes, setCurrentMinutes] = useState(0)
  // const [selectedDays, setSelectedDays] = useState('')
  const currentHourRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const formatTime = (timeUnit) => {
      if (timeUnit.toString().length == 1) {
        return `0${timeUnit}`
      }

      return timeUnit
    }
    const update = () => {
      const date = new Date()
      setCurrentHours(formatTime(date.getHours()))
      setCurrentMinutes(formatTime(date.getMinutes()))
    }
    update()
    const interval = setInterval(() => {
      update()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  const handleClick = (className) => {
    let hours = currentHourRef.current
    if (hours) {
      hours.classList.toggle(className)
      timerRef.current = setTimeout(
        () => hours.classList.remove(className),
        1000
      )
    }
  }

  return (
    <>
      <main>
        <div className='currentTime'>
          <span>
            {currentHours}:{currentMinutes}
          </span>
        </div>

        <div className='selectTime'>
          <div className='selectHours'>
            <button className='change' onClick={() => handleClick('moveup')}>
              down
            </button>
            <div className='hours__wrapper'>
              <div ref={currentHourRef} className='hours'>
                {currentHours}
              </div>
            </div>
            <button className='change' onClick={() => handleClick('movedown')}>
              up
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
