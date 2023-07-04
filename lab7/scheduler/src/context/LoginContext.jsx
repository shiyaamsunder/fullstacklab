import { createContext, useState } from 'react'

export const LoginContext = createContext(null)

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = () => {
    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('roll')
  }

  const loginState = { login, logout, isLoggedIn }

  return (
    <LoginContext.Provider value={loginState}>{children}</LoginContext.Provider>
  )
}
