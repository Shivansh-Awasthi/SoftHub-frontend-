import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import CreateApps from './components/admin/CreateApps';
import Mac from './components/category/mac/Mac';
import Pc from './components/category/pc/Pc';
import Android from './components/category/android/Android';
import MacSoftwares from './components/category/mac/MacSoftwares';
import PcSoftwares from './components/category/pc/PcSoftwares';
import Ps2 from './components/category/playstation/Ps2';
import Ps3 from './components/category/playstation/Ps3';
import Ps4 from './components/category/playstation/Ps4';
import Ppsspp from './components/category/playstation/Ppsspp';
import AndroidSoftwares from './components/category/android/AndroidSoftwares';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import SingleApp from './components/SingleApp';
import Logout from './components/Logout';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen"> {/* Flex container for layout */}
        <Sidebar className="w-1/4" /> {/* Sidebar on the left */}
        <div className="flex-1 p-8 overflow-auto"> {/* Main content area */}
          <Header />
          <Routes>
            <Route path='/signup' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path='/' element={<Home />} />
            <Route path='/:id' element={<SingleApp />} />

            <Route path='/search' element={<SearchResults />} />

            {/* admin routes */}
            <Route path='/admin/apps/new' element={<CreateApps />} />
            {/* category routes */}
            <Route path='/category/mac/games' element={<Mac />} />
            <Route path='/category/mac/softwares' element={<MacSoftwares />} />
            <Route path='/category/pc/games' element={<Pc />} />
            <Route path='/category/pc/softwares' element={<PcSoftwares />} />
            <Route path='/category/android/games' element={<Android />} />
            <Route path='/category/android/softwares' element={<AndroidSoftwares />} />
            {/* playstation iso routes */}
            <Route path='/category/ps2/iso' element={<Ps2 />} />
            <Route path='/category/ps3/iso' element={<Ps3 />} />
            <Route path='/category/ps4/iso' element={<Ps4 />} />
            <Route path='/category/ppsspp/iso' element={<Ppsspp />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
