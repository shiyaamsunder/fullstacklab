import { useContext } from 'react'
import { PageContext } from './PageContext'
import Login from './Login'
import { LoginContext } from './LoginContext'
import Slot from './Slot'

export default function Faculty() {
  const { goToHome } = useContext(PageContext)
  const { isLoggedIn } = useContext(LoginContext)

  return (
    <div>
      {!isLoggedIn && <Login label='Faculty ID' loginFor={'faculty'} />}

      {isLoggedIn && (
        <>
          <Slot />
          <button onClick={goToHome}>Go Home</button>
        </>
      )}
    </div>
  )
}
