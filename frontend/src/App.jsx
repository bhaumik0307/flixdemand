import React, {useEffect, useState} from 'react'
import { Main, Login, Signup, Home, Myrentals, Myinfo } from './components'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/signup' element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/' element={isAuthenticated?<Main setIsAuthenticated={setIsAuthenticated} />:<Navigate to='/login' />} >
          <Route path='/home' element={<Home />} />
          <Route path='/myrentals' element={<Myrentals />} />
          <Route path='/me' element={<Myinfo />} />

        </Route>
      </Routes>
    </Router>
  )
}

export default App
