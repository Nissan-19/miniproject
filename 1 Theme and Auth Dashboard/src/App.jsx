import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
const AuthContext = createContext()
const ThemeContext = createContext()

function Navbar(){
  const {isLoggedIn} = useContext(AuthContext)
  const {theme}= useContext(ThemeContext)
    return(
      <div>
        <h2>Navbar</h2>
        <p>status: {isLoggedIn ? "Logged in":"logged Out"}</p>
        <p>Theme : {theme}</p>
      </div>
    )
  }

  function Dashboard(){
    const {dashboardMessage} = useContext(AuthContext)
    return (
       <div>
        <h2>Dashboard</h2>
        <p>{dashboardMessage}</p>
      </div>
    )
  }

  function ActionPanel (){
    const{isLoggedIn, login, logout} = useContext(AuthContext)
    const{toggleTheme} = useContext(ThemeContext)
    return (
      <div>
        <h2>Action Panel</h2>
        {isLoggedIn ? (

          <button onClick={logout}>Logout</button>  
          ) : (
          <button onClick={login}>Login</button> 
          )
      
        }
        <button onClick={toggleTheme}>Toggle theme</button>
      </div>
    )
  }


const App = () => {

  const[isLoggedIn, setIsLoggedIn] = useState(false)
  const[theme, setTheme] = useState("light")

  
  const login = useCallback(()=>{
    setIsLoggedIn(true)
  },[])

  const logout=useCallback(()=>{
    setIsLoggedIn(false)
  },[])

  const toggleTheme = useCallback(()=>{
    setTheme((previousTheme)=> previousTheme === "light"?"dark":"light")
  },[])

  const appStyle = {
    backgroundColor : theme === "light"? "white":"black",
    color:  theme === "light"? "black":"white",
    minHeight: "100vh",
    padding:"20px"
  }

  const dashboardMessage = useMemo(() =>{
          console.log("calculating dashboard message")
         
         return isLoggedIn ?
          "Welcome back, You can access your dashboard"
          :
          "Please login to access your dashboard"
        },[isLoggedIn]  )

  return (
    <AuthContext.Provider
    value={{isLoggedIn, login, logout, dashboardMessage}}>
    <ThemeContext.Provider
      value = {{theme, toggleTheme}} >
    
    <div style={appStyle}>
      <h1>Theme + Auth Dashboard</h1>
      
      <Navbar  />

      <Dashboard />
     
      <ActionPanel 
        />

      
    </div>
    </ThemeContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
