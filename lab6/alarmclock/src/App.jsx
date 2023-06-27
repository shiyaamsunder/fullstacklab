import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [displayTime, setDisplayTime] = useState('')
  const [alarms, setAlarms] = useState([])

  const alarmRef = useRef(null)
  const noteRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const date = new Date()
      setDisplayTime(
        date.toLocaleString('en-GB', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: 'true',
        })
      )

      if (alarms.length > 0 && date.getTime() >= alarms[0].time) {
        alert('alarm')
        let copy = alarms
        copy.shift()
        setAlarms(copy)
      }
    }

    update()
    const interval = setInterval(() => {
      update()
    }, 1000)

    return () => clearInterval(interval)
  }, [alarms])

  const handleClick = () => {
    if (!alarmRef.current.value || !noteRef.current.value) return
    let alarmDate = new Date(alarmRef.current.value)
    if (alarms.find((a) => a == alarmDate.getTime())) {
      return
    }

    let copy = [...alarms]

    copy.push({ note: noteRef.current.value, time: alarmDate.getTime() })

    let sorted = copy.sort((a, b) => a.time - b.time)
    setAlarms(sorted)
    alarmRef.current.value = ''
    noteRef.current.value = ''
  }

  const handleRemove = (time) => {
    let removedArray = [...alarms].filter((a) => a.time !== time)
    setAlarms(removedArray)
  }
  return (
    <>
      <main>
        <div className='currentTime'>
          <span>{displayTime.toUpperCase()}</span>
        </div>
        <input type='text' ref={noteRef} />
        <input
          type='datetime-local'
          min={new Date().toISOString().slice(0, 16)}
          ref={alarmRef}
        />
        <button onClick={handleClick}>Add an alarm</button>
        <p>Upcoming Alarms</p>
        <div className='alarm__list'>
          {alarms.map((alarm, i) => (
            <div className='alarm__item' key={i}>
              <div className='left'>
                <div className='alarm__note'>{alarm.note}</div>
                <div className='alarm__time'>
                  {new Date(alarm.time).toLocaleString('en-GB', {
                    hour12: true,
                  })}
                </div>
              </div>
              <div className='right'>
                <button onClick={() => handleRemove(alarm.time)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default App
