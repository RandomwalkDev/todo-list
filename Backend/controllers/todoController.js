import customError from "../utils/customError.js"
import TodoModel from "../models/TodoModel.js";

export const getTodos = async (req, res, next) => {
    try {
        const todos = await TodoModel.find({}).sort({ createdAt: 1 });
        return res.status(200).json({
            success: true,
            message: (todos.length > 0) ? "All Todos Fetched !" : "No Todos present !",
            todos: (todos.length > 0) ? todos : null
        })
    } catch (error) {
        next(error);
    }
}

export const createTodo = async (req, res, next) => {
    try {
        const { todo } = req.body;
        const createdTodo = await TodoModel.create({ todo });
        return res.status(200).json({
            success: true,
            message: "Todo Created Successfully!",
            todo: createdTodo
        })
    } catch (error) {
        next(error);
    }
}

export const editTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("The todo : ", req.body);
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({
            success: true,
            message: "Todo Updated Successfully!",
            todo: updatedTodo
        })
    } catch (error) {
        next(error);
    }
}

export const deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedTodo = await TodoModel.findByIdAndDelete(id);

        if (!deletedTodo) return customError(404, "Todo Not Found!");

        return res.status(200).json({
            success: true,
            message: "Todo Deleted Successfully!",
            todo: deletedTodo
        })
    } catch (error) {
        next(error);
    }
}