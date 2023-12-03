import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Link, NavLink, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Root from './routes/root';
import Signup from './routes/signup';
import Dashboard from './routes/dashboard';
import Login from './routes/login';
import RequireAuth from './routes/RequireAuth';
import Protected from './routes/protected';
import useAuth from './hooks/useAuth';

function App() {

  // useEffect(() => {
    

  // }, [])

  const rootElement = document.getElementById('root');
  const body = document.body;
  rootElement.style.display = 'flex';
  rootElement.style.justifyContent = 'center';
  rootElement.style.alignItems = 'center';
  rootElement.style.flexDirection = 'column';
  rootElement.style.height = '100vh';
  rootElement.style.width = '100vw';
  rootElement.style.background = 'rgb(2,0,36)';
  rootElement.style.backgroundColor = 'ghostwhite';
  body.style.height = 'auto';
  body.style.display = 'flex';
  body.style.justifyContent = 'center';
  body.className = 'font-poppins';

  const { setAuth } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('isLoggedIn') ? JSON.parse(window.localStorage.getItem('isLoggedIn')) : null);
  const [user, setUser] = useState(window.localStorage.getItem('userData') ? window.localStorage.getItem('userData') : null);
  // setAuth({
  //   user: user
  // });

  return (
    <>
    <Routes>
    <Route path="/" element={<Root user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
      <Route path="signup" element={<Signup setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      <Route path='/login' element={<Login setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>

      <Route element={<RequireAuth user={user} />}>
        <Route path='/home' element={<Dashboard setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/protected' element={<Protected />}></Route>
      </Route>
    </Route>
    </Routes>
    </>
  )
}

export default App;
