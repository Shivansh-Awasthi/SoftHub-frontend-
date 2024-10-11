import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import CreateApps from './components/admin/CreateApps'


function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/admin/apps/new' element={<CreateApps />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
