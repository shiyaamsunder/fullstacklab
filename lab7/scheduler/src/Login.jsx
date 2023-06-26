import { useContext, useState } from 'react'
import { LoginContext } from './LoginContext'
import './Login.css'

export default function Login({ label, loginFor }) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(LoginContext)
  const handleIdentifier = (e) => {
    setIdentifier(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleLogin = (e) => {
    e.preventDefault()
    if (
      loginFor === 'student' &&
      (identifier === '2001' ||
        identifier === '2002' ||
        identifier === '2003') &&
      password === 'student'
    ) {
      login()
      localStorage.setItem('roll', identifier)
    } else if (
      loginFor === 'faculty' &&
      identifier === 'faculty' &&
      password === 'faculty'
    ) {
      login()
    } else {
      alert('Wrong username or password')
    }
  }
  return (
    <form>
      <div className='control'>
        <label>{label}</label>
        <input onChange={handleIdentifier} value={identifier} />
      </div>
      <div className='control'>
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => handlePassword(e, identifier, password)}
          type='password'
        />
      </div>
      <button type='submit' onClick={handleLogin}>
        Login
      </button>
    </form>
  )
}
