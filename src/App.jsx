import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import CreateApps from './components/admin/CreateApps'
import Mac from './components/category/Mac'
import Pc from './components/category/Pc'
import Android from './components/category/Android'
import MacSoftwares from './components/category/MacSoftwares'
import PcSoftwares from './components/category/PcSoftwares'
import Ps2 from './components/category/playstation/Ps2'
import Ps3 from './components/category/playstation/Ps3'
import Ps4 from './components/category/playstation/Ps4'
import Ppsspp from './components/category/playstation/Ppsspp'
import AndroidSoftwares from './components/category/AndroidSoftwares'


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
          <Route path='/category/mac/softwares' element={<MacSoftwares />} />
          <Route path='/category/pc/games' element={<Pc />} />
          <Route path='/category/pc/softwares' element={<PcSoftwares />} />
          <Route path='/category/android/games' element={<Android />} />
          <Route path='/category/android/softwares' element={<AndroidSoftwares />} />
          {/* playstation iso's routes */}
          <Route path='/category/ps2/iso' element={<Ps2 />} />
          <Route path='/category/ps3/iso' element={<Ps3 />} />
          <Route path='/category/ps4/iso' element={<Ps4 />} />
          <Route path='/category/ppsspp/iso' element={<Ppsspp />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
