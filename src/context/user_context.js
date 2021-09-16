import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const { user, loginWithRedirect, logout } = useAuth0()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    setCurrentUser(user)
  }, [user])

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, currentUser }}>
      {children}
    </UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
