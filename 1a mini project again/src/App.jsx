import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
const AuthContext = createContext()
const ThemeContext = createContext()

function Navbar(){
  const {isLoggedIn}= useContext(AuthContext)
  const {theme}=useContext(ThemeContext)
  return(
    <div>
        <h2>Navbar</h2>
          <p>status: {isLoggedIn ? "Logged in":"Logged out"}</p>
          <p>Theme: {theme === "light"?"light":"dark"}</p>
      </div>
  )
}

function Dashboard(){
  const {dashboardMessage}= useContext(AuthContext)
  return(
      <div>
        <h2>Dashboard</h2>
        <p>{dashboardMessage}</p>
      </div>
  )
}

function ActionPanel(){
    const {isLoggedIn,login,logout}=useContext(AuthContext)
    const {toggleTheme}=useContext(ThemeContext)

  return(
      <div>
        <h2>Action Panel</h2>
          { isLoggedIn ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <button onClick={login}>Login</button>
          )
            

          }
          <button onClick={toggleTheme}>Change Theme</button>
      </div>
  )
}

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [theme, setTheme] = useState("light")

  const login =useCallback(()=>{
    setIsLoggedIn(true)
  },[])

  const logout = useCallback(()=>{
    setIsLoggedIn(false)
  },[])

  const toggleTheme=useCallback(()=>{
    setTheme((previousTheme)=>
      previousTheme==="light"?
        "dark":"light")
  },[])

  const dashboardMessage = useMemo(()=>{

      return isLoggedIn ? (
          "Welcome back. You can access your dashboard"   
            ) : (
          "Please log in to access your dashboard"
            )
        },[isLoggedIn])
  


  const appStyle = {
    backgroundColor : theme === "light"? "white":"black",
    color : theme === "light"? "black": "white",
    maxHeight:"100vh",
    padding:"20px"
  }

  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout, dashboardMessage}}>
    <ThemeContext.Provider value={{toggleTheme,theme}}>
      <div style={appStyle}>
      
        <h1>Ex1 revison again</h1>
        
        <Navbar  />
        <dashboardMessage  />
        <ActionPanel
          
        />

        
      </div>
    </ThemeContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
