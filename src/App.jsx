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
import SingleApp from './components/SinglePage/SingleApp';
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
    const isAdmin = localStorage.getItem("role") === "ADMIN";

    if (isAdmin) {
      return;
    }

    const warnMessage = "Blocked by Client. Developer Tools are disabled.";

    function isDevToolsOpen() {
      const threshold = 160;
      const devToolsOpened = window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;
      return devToolsOpened;
    }

    const monitorDevTools = () => {
      if (isDevToolsOpen()) {
        console.error("Failed to load resource: net::ERR_BLOCKED_BY_CLIENT");
      }
    };

    const interval = setInterval(() => {
      monitorDevTools();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const isAdmin = localStorage.getItem("role") === "ADMIN";

    if (isAdmin) {
      return;
    }

    const blockConsoleInput = () => {
      const originalConsoleLog = console.log;
      const originalConsoleWarn = console.warn;
      const originalConsoleError = console.error;
      const originalConsoleDebug = console.debug;

      console.log = function () { };
      console.warn = function () { };
      console.error = function () { };
      console.debug = function () { };

      const preventKeyPress = (e) => {
        if (
          (e.keyCode === 123) ||
          (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
          (e.metaKey && e.altKey && e.keyCode === 73) ||
          (e.keyCode === 74 && (e.ctrlKey || e.metaKey) && e.shiftKey)
        ) {
          e.preventDefault();
        }
      };

      const preventRightClick = (e) => {
        e.preventDefault();
      };

      document.addEventListener('keydown', preventKeyPress);
      document.addEventListener('contextmenu', preventRightClick);

      const checkDevTools = () => {
        const devToolsOpen = window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200;
        if (devToolsOpen) {
          alert('DevTools is detected!');
        }
      };

      const interval = setInterval(checkDevTools, 2000);

      return () => {
        clearInterval(interval);
        console.log = originalConsoleLog;
        console.warn = originalConsoleWarn;
        console.error = originalConsoleError;
        console.debug = originalConsoleDebug;
        document.removeEventListener('keydown', preventKeyPress);
        document.removeEventListener('contextmenu', preventRightClick);
      };
    };

    blockConsoleInput();
  }, []);

  useEffect(() => {
    document.getElementById('root').style.visibility = 'visible';
  }, []);

  return (
    <BrowserRouter>
      <UserProvider>
        <div className="flex h-screen">
          <Sidebar className="w-1/4" />
          <div className="flex-1 p-8 overflow-auto">
            <Routes>
              <Route path='/signup' element={<><Header /><Register /></>} />
              <Route path='/login' element={<><Header /><Login /></>} />
              <Route path="/logout" element={<><Header /><Logout /></>} />
              <Route path='/' element={<><Header /><Home /></>} />
              <Route path='/download/:platform/:slug/:id' element={<><Header /><SingleApp /></>} />
              <Route path='/search' element={<><Header /><SearchResults /></>} />
              <Route path='/gamepage' element={<><Header /><GamePage /></>} />

              {/* Modified Donate route with custom Header */}
              <Route path='/donate' element={
                <>
                  <Header showSearchBar={false} />
                  <Donate />
                </>
              } />

              {/* other pages */}
              <Route path='/copyright-holders' element={<><Header /><Dmca /></>} />
              <Route path='/policy' element={<><Header /><Policy /></>} />
              <Route path='/faq' element={<><Header /><Faq /></>} />
              <Route path='/contacts' element={<><Header /><Contacts /></>} />

              {/* admin routes */}
              <Route path='/admin/apps/new' element={<><Header /><CreateApps /></>} />
              <Route path='/admin/apps/edit/:id' element={<><Header /><EditApps /></>} />
              <Route path='/admin/apps/delete/:id' element={<><Header /><DeleteApps /></>} />

              {/* category routes */}
              <Route path='/category/mac/games' element={<><Header /><Mac /></>} />
              <Route path='/category/mac/softwares' element={<><Header /><MacSoftwares /></>} />
              <Route path='/category/pc/games' element={<><Header /><Pc /></>} />
              <Route path='/category/pc/softwares' element={<><Header /><PcSoftwares /></>} />
              <Route path='/category/android/games' element={<><Header /><Android /></>} />
              <Route path='/category/android/softwares' element={<><Header /><AndroidSoftwares /></>} />

              {/* playstation iso routes */}
              <Route path='/category/ps2/iso' element={<><Header /><Ps2 /></>} />
              <Route path='/category/ps3/iso' element={<><Header /><Ps3 /></>} />
              <Route path='/category/ps4/iso' element={<><Header /><Ps4 /></>} />
              <Route path='/category/ppsspp/iso' element={<><Header /><Ppsspp /></>} />

              {/* redirect */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;