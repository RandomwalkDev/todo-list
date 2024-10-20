import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateTask from './components/Create/CreateTask'
import TodoList from './components/Todos-List/TodoList'
import textToSpeech from './utils/TextToSpeech.js'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-slate-700 roboto'>
      <div className='max-w-6xl h-auto rounded-md shadow-lg p-2 bg-[#FFF1DB]'>
        <header className='flex justify-around items-center gap-40'>
          <h1 className='text-4xl font-bold'>TODO</h1>
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
  )
}

export default App
