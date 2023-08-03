import React, { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import AppRouter from './components/AppRouter'
import './App.scss'
import { Context } from '.'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loading from './components/Loading'
export const App = () => {
  const { auth } = useContext(Context)
  const [user,loading,error] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Navbar />
      {!loading
        ?
        <AppRouter />
        :
        <Loading />
      }
    </BrowserRouter>
  )
}

export default App;