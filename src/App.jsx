import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import CreateApps from './components/admin/CreateApps'
import Mac from './components/category/Mac'


function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          {/* admin  */}
          <Route path='/admin/apps/new' element={<CreateApps />} />
          {/* category */}
          <Route path='/category/mac/games' element={<Mac />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
