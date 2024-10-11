import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'


function App() {



  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
