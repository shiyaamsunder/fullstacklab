import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [currentTime, setCurrentTime] = useState(
    `${new Date().getHours()}:${new Date().getMinutes()}`
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(`${new Date().getHours()}:${new Date().getMinutes()}`)
    }, 1000 * 60)

    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <main>
        <div className='currentTime'>
          <span>{currentTime}</span>
        </div>
      </main>
    </>
  )
}

export default App
