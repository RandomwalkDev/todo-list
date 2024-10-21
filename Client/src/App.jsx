import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateTask from './components/Create/CreateTask'
import TodoList from './components/Todos-List/TodoList'
import textToSpeech from './utils/TextToSpeech.js'
import { Toaster } from 'react-hot-toast';
import ThemeProvider from './components/ThemeProvider.jsx'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import { setTheme } from './store/themeSlice.js'
function App() {

  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const handleThemeChange = () => {
    dispatch(setTheme());
  }
  return (
    <ThemeProvider>
      <div className='w-screen h-screen flex justify-center items-center dark:bg-slate-700 roboto bg-[#FFF1DB] relative'>
        <div className='absolute top-5 right-5 border-2 border-slate-500 rounded-full bg-slate-600 shadow-lg'>
          <IconButton
            onClick={handleThemeChange}
          >
            {theme === 'light' ? <DarkModeIcon sx={{ color: "white", fontSize: '3rem' }} /> : <LightModeIcon sx={{ color: "white", fontSize: '3rem' }} />}
          </IconButton>
        </div>

        <div className='max-w-6xl h-auto rounded-md shadow-lg p-4 dark:bg-[#FFF1DB] bg-slate-700 text-white dark:text-black'>
          <header className='flex justify-around items-center gap-40'>
            <h1 className='text-4xl font-bold '>TODO</h1>
            <h2 className='font-bold'>
              <div className='text-wrap'>
                <h2>Today: </h2>
                <h2>{
                  new Date().toLocaleDateString('en-US', {
                    month: "long",
                    year: "numeric", day: "numeric"
                  })
                }</h2>
              </div>
            </h2>
          </header>
          <main>
            <CreateTask />
            <TodoList />
          </main>
          <Toaster />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
