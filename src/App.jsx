import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import CreateApps from './components/admin/CreateApps';
import EditApps from './components/admin/EditApps';
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
import DeleteApps from './components/admin/DeleteApps';
import { useEffect } from 'react';
import GamePage from './components/sitemap/GamePage';
import Dmca from './components/other pages/Dmca';
import Donate from './components/other pages/Donate';
import Policy from './components/other pages/Policy';
import Faq from './components/other pages/Faq';
import Contacts from './components/other pages/Contacts';
import UserProvider from './components/hooks/UserContext';

function App() {

  useEffect(() => {
    document.getElementById('root').style.visibility = 'visible';
  }, []);

  return (
    <BrowserRouter>
      <UserProvider>
        <div className="flex h-screen"> {/* Flex container for layout */}
          <Sidebar className="w-1/4" /> {/* Sidebar on the left */}
          <div className="flex-1 p-8 overflow-auto"> {/* Main content area */}
            <Header />

            <Routes>
              <Route path='/signup' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path='/' element={<Home />} />
              <Route path='/download/:platform/:slug/:id' element={<SingleApp />} />

              <Route path='/search' element={<SearchResults />} />

              <Route path='/gamepage' element={<GamePage />} />

              {/* redirect */}
              <Route path="*" element={<Navigate to="/" />} />
              {/* other pages */}
              <Route path='/copyright-holders' element={<Dmca />} />
              <Route path='/policy' element={<Policy />} />
              <Route path='/donate' element={<Donate />} />
              <Route path='/faq' element={<Faq />} />
              <Route path='/contacts' element={<Contacts />} />

              {/* admin routes */}
              <Route path='/admin/apps/new' element={<CreateApps />} />
              <Route path='/admin/apps/edit/:id' element={<EditApps />} />
              <Route path='/admin/apps/delete/:id' element={<DeleteApps />} />
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
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
