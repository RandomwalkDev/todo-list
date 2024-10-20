import React, { useEffect, useState } from 'react'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CachedIcon from '@mui/icons-material/Cached';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo, setEditing, setTodoInput } from '../store/todoSlice';
import todoService from '../Services/TodoService';
import { toast } from 'react-hot-toast';
import textToSpeech from '../utils/TextToSpeech';
import { ColorRing } from 'react-loader-spinner'

const Todo = ({ item }) => {
    const [completed, setCompleted] = useState(item.completed);
    const [wait, setWaiting] = useState(false);
    const dispatch = useDispatch();

    const handleCompleteTask = async () => {
        try {
            setWaiting(true);
            const result = await todoService.editTodo(item._id, { ...item, completed: !item.completed });
            setWaiting(false);

            if (result.data) {
                // success
                const { data: { todo } } = result;
                dispatch(editTodo(todo));
                setCompleted(prev => !prev);
            }
            else {
                // error
                const { response: { data: { message } } } = result;
                toast.error(message)
            }
        } catch (error) {
            setWaiting(false);
            console.log("error");
            textToSpeech('Sorry ! Try Again later');
        }
    }

    const handleEditTodo = () => {
        dispatch(setTodoInput(item.todo));
        dispatch(setEditing(item));
    }

    const handleDeleteTodo = async () => {
        try {
            let result = await todoService.deleteTodo(item._id);
            if (result.data) {
                // success
                const { data: { todo } } = result;
                toast.success('Task Deleted Successfully !');
                textToSpeech("Task Deleted Successfully !");
                dispatch(deleteTodo(todo));
            }
            else {
                // error
                const { response: { data: { message } } } = result;
                toast.error(message)
                textToSpeech("Sorry! Task Cannot be Deleted ! Try again later !");
            }
        } catch (error) {
            console.log(error)
            textToSpeech("Sorry! Task Cannot be Deleted ! Try again later !");
        }
    }

    return (
        <div className='text-2xl my-2 flex justify-between items-center'>
            <div className='flex gap-2 items-center self-start max-w-2xl'>
                {wait ? <ColorRing height={"40"} /> : <IconButton onClick={handleCompleteTask}>
                    {completed ? <CheckBoxIcon
                        sx={{
                            color: "green"
                        }}
                    /> : <CheckBoxOutlineBlankIcon
                    />}
                </IconButton>}
                <li key={item._id} className={`${completed ? "line-through" : ""}`} >
                    {item.todo}
                </li>

            </div>
            <div className='flex items-center justify-center gap-2 '>
                <IconButton
                    sx={{ color: "blue" }}
                    onClick={handleEditTodo}
                >
                    <EditIcon />
                </IconButton>
                <IconButton sx={{ color: "red" }}
                    onClick={handleDeleteTodo}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Todo
