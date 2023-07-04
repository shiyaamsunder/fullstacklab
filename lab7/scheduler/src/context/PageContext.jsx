import { createContext, useState } from 'react'

export const PageContext = createContext(null)

export const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home')

  const goToStudent = () => {
    setCurrentPage('student')
  }

  const goToFaculty = () => {
    setCurrentPage('faculty')
  }
  const goToHome = () => {
    setCurrentPage('home')
  }
  const pageState = { currentPage, goToStudent, goToHome, goToFaculty }

  return (
    <PageContext.Provider value={pageState}>{children}</PageContext.Provider>
  )
}
