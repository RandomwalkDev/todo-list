import React, { useState, useEffect, useReducer, useRef } from 'react'
import textToSpeech from "../../utils/TextToSpeech.js"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, editTodo, setEditing, setTodoInput } from '../../store/todoSlice.js';
import todoService from '../../Services/TodoService.js';
import { toast } from 'react-hot-toast'
import { ColorRing } from 'react-loader-spinner';

const CreateTask = ({ item }) => {

  let todoInput = useSelector((state) => state.todo.todoInput);
  const editing = useSelector((state) => state.todo.editing);
  const dispatch = useDispatch();
  const [wait, setWait] = useState(false)

  const {
    transcript,
    resetTranscript,
  } = useSpeechRecognition();

  const handleAddTask = async (event) => {
    event?.preventDefault();
    if (todoInput) {

      try {
        let result;
        setWait(true)
        if (editing) {
          result = await todoService.editTodo(editing._id, { ...editing, todo: todoInput });
        }
        else {
          result = await todoService.addTodo(todoInput);
        }
        setWait(false)
        if (result.data) {
          // success
          const { data: { todo } } = result;

          if (editing) {
            toast.success('Task Editied Successfully !');
            textToSpeech("Task Editied Successfully !");
            dispatch(setEditing(null));
            dispatch(editTodo(todo));
          }
          else {
            toast.success('Task Added to Todo List !');
            textToSpeech("Task Added to Todo List !");
            dispatch(addTodo(todo));
          }
        }
        else {
          // error
          setWait(false)
          const { response: { data: { message } } } = result;
          toast.error(message)
          if (editing) {
            textToSpeech("Sorry ! Cannot edit todo ! Try again later!");
            dispatch(setEditing(null));
          }
          else {
            textToSpeech("Sorry ! Cannot add todo ! Try again later!");
          }
        }
      } catch (error) {
        setWait(false)
        console.log(error)
        dispatch(setEditing(null));
        textToSpeech("Sorry ! Cannot add todo ! Try again later!");
      }
      dispatch(setEditing(null));
      dispatch(setTodoInput(""));
      resetTranscript();
    }
  }

  const startListening = () => {
    dispatch(setTodoInput(""));
    SpeechRecognition.startListening({ continuous: true });
  }
  const stopListening = () => {
    SpeechRecognition.stopListening();
    dispatch(setTodoInput(transcript));
    resetTranscript();
  }

  return (
    <div>
      <form action="" onSubmit={handleAddTask} className='my-2 flex gap-2'>
        <input type="text"
          value={todoInput || transcript}
          onChange={(event) => {
            dispatch(setTodoInput(event.target.value));
          }}
          className='border-none outline-slate-800 py-2 px-4 font-serif text-xl bg-slate-500 text-white w-full min-w-20 rounded-md shadow-lg cursor-pointer'
          id='create'
        />
        {wait ? <ColorRing height={"40"} /> : <button type='submit' className='py-1 px-2 bg-red-500 hover:bg-red-400 dark:bg-purple-800 text-white font-bold rounded-md text-center shadow-lg dark:hover:bg-purple-700 transition-all duration-100'>Add</button>}

      </form>
      <button className='py-1 px-2 bg-red-500 hover:bg-red-400 dark:bg-purple-800 text-white font-bold rounded-md text-center shadow-lg dark:hover:bg-purple-700 transition-all duration-100'
        // onTouchStart={startListening}
        // onTouchEnd={stopListening}
        onMouseDown={startListening}
        onMouseUp={stopListening}
      >Speak & Add</button>
    </div>
  )
}

export default CreateTask
