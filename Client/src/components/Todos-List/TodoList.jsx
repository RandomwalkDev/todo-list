import React, { useEffect, useState } from 'react'
import Todo from '../Todo.jsx'
import { useDispatch, useSelector } from 'react-redux'
import todoService from '../../Services/TodoService.js';
import { setTodoList } from '../../store/todoSlice.js';

const TodoList = () => {

  const todoList = useSelector((state) => state.todo.todoList);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const getAllTodos = async () => {
      try {
        setLoading(true);
        const result = await todoService.getTodos();
        setLoading(false);

        if (result.data) {
          // success
          const { data: { todos } } = result;
          if (todos) {
            dispatch(setTodoList(todos));
          }
        }
        else {
          // error
          const { response: { data: { message } } } = result;
          dispatch(setTodoList([]));
        }
      } catch (error) {
        setLoading(false);
        dispatch(setTodoList([]));
        console.log(error);
      }
    }
    getAllTodos();
  }, [])

  if (loading) {
    return (<div className='mt-4 p-2'>
      <h1 className='text-center text-2xl font-serif'>Loading Todos... !</h1>
    </div>)
  }


  return todoList.length > 0 ? (
    <>
      <ul className='list-none'>
        {todoList.map((item) => {
          return (
            <div key={item._id}>
              <Todo item={item} />
            </div>
          )
        })}
      </ul>

    </>
  ) : (
    <div className='mt-4 p-2'>
      <h1 className='text-center text-2xl font-serif'>Add Todos To your List !</h1>
    </div>
  )
}

export default TodoList
