import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import Practice from './Practice.jsx'
import FunctionalComponent from './FunctionalComponent'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Practice name="hello"/>
    <FunctionalComponent count={100}/>
  </React.StrictMode>,
)
