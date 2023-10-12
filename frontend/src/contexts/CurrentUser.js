import { createContext, useState, useEffect } from "react"

export const CurrentUser = createContext()

function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  // fetch the current user on page load
  useEffect(() => {

    const getLoggedInUser = async () => {
        let response = await fetch('http://localhost:3000/authentication/profile', {
            credentials: 'include'
        })
        let user = await response.json()
        setCurrentUser(user)
    }
    getLoggedInUser()
}, [])
  window.setCurrentUser = setCurrentUser
  return (
    <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUser.Provider>
  )
}

export default CurrentUserProvider
