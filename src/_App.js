import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import TahapanPMB from './pages/TahapanPMB';

import './App.css';

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (

    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="relative flex dark:bg-gelap">

          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Pengaturan" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="p-3 text-3xl text-white hover:drop-shadow-xl hover:bg-soft"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>

          {activeMenu ? (
            <div className="fixed bg-white w-72 sidebar dark:bg-terang "><Sidebar /></div>
          ) : (
            <div className="w-0 dark:bg-terang"><Sidebar /></div>
          )}
          
          <div
            className={activeMenu
                ? 'dark:bg-gelap  bg-krem min-h-screen md:ml-72 w-full  '
                : 'bg-krem dark:bg-gelap  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed w-full md:static bg-krem dark:bg-gelap navbar "><Navbar /></div>
          
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* auth */}
                <Route path="/" element={(<Register />)} />
                <Route path="/register" element={(<Register />)} />
                <Route path="/login" element={(<Login />)} />

                {/* dashboard */}
                <Route path="/dashboard" element={(<Dashboard />)} />

                {/* pmb */}
                <Route path="/tahapan-pmb" element={(<TahapanPMB />)} />

              </Routes>
            </div>
          
            <Footer />

          </div>

        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
