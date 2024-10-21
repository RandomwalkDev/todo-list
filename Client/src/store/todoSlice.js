import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    todoInput: "",
    todoList: [],
    editing: null
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setEditing: (state, action) => {
            state.editing = action.payload;
        },
        setTodoInput: (state, action) => {
            state.todoInput = action.payload;
        },
        addTodo: (state, action) => {
            state.todoList.push(action.payload);
        },
        editTodo: (state, action) => {
            state.todoList = state.todoList.map((todo) => {
                if (todo._id == action.payload._id) return action.payload;
                return todo;
            })
        },
        deleteTodo: (state, action) => {
            state.todoList = state.todoList.filter((todo) => todo._id != action.payload._id)
        },
        setTodoList: (state, action) => {
            state.todoList = action.payload
        }
    }
})

export default todoSlice.reducer;

export const { addTodo, deleteTodo, editTodo, setTodoInput, setTodoList, setEditing } = todoSlice.actions