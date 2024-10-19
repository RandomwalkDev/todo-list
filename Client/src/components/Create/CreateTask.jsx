import React, { useState, useEffect } from 'react'
import textToSpeech from "../../utils/TextToSpeech.js"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import '../node_modules/regenerator-runtime/runtime.js'

const CreateTask = () => {
  const [input, setInput] = useState('');
  const {
    transcript,
    resetTranscript,
  } = useSpeechRecognition();

  const handleAddTask = (event) => {
    event?.preventDefault();
    if (input) {
      console.log(input)
      textToSpeech("Task Added to Todo List !");
      setInput("");
    }
  }

  const startListening = () => {
    setInput("");
    SpeechRecognition.startListening({ continuous: true });
  }
  const stopListening = () => {
    SpeechRecognition.stopListening();
    setInput(transcript);
    resetTranscript();
  }

  return (
    <div>
      <form action="" onSubmit={handleAddTask} className='my-2 flex gap-2'>
        <input type="text"
          value={input || transcript}
          onChange={(event) => setInput(event.target.value)}
          className='border-none outline-slate-800 py-2 px-4 font-serif text-xl bg-slate-500 text-white w-full min-w-20 rounded-md shadow-lg cursor-pointer'
          id='create'
        />
        <button type='submit' className='py-1 px-2 bg-purple-800 text-white font-bold rounded-md text-center shadow-lg hover:bg-purple-700 transition-all duration-100'>Add</button>
      </form>
      <button className='py-1 px-2 bg-purple-800 text-white font-bold rounded-md text-center shadow-lg hover:bg-purple-700 transition-all duration-100'
        onTouchStart={startListening}
        onTouchEnd={stopListening}
        onMouseDown={startListening}
        onMouseUp={stopListening}
      >Hold To Speek Speech</button>
    </div>
  )
}

export default CreateTask
