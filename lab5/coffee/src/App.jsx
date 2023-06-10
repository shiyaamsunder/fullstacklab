import { useState } from 'react'
import './App.css'

function App({ totalStockCookies, totalStockBluberries }) {
  const [bluberries, setBluberries] = useState(totalStockBluberries)
  const [cookies, setCookies] = useState(totalStockCookies)

  return (
    <>
      <main>
        <h1>Salem Café</h1>

        <div className='wrapper'>
          <div className='item'>
            <div className='left'>Bluberry Muffins</div>
            <div className='right'>
              <span className='count'>{bluberries}</span>
              <button
                disabled={bluberries === 0}
                onClick={() => setBluberries((prev) => prev - 1)}
              >
                Buy
              </button>
            </div>
          </div>
          <div className='item'>
            <div className='left'>Chocolae chip cookies</div>
            <div className='right'>
              <span className='count'>{cookies}</span>
              <button
                disabled={cookies === 0}
                onClick={() => setCookies((prev) => prev - 1)}
              >
                Buy
              </button>
            </div>
          </div>

          <h3>
            Items sold so far:{' '}
            {totalStockCookies + totalStockBluberries - (bluberries + cookies)}
          </h3>
        </div>
      </main>
    </>
  )
}

export default App
