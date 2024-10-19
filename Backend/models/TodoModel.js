import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const TodoModel = mongoose.model('Todos', todoSchema);
export default TodoModel