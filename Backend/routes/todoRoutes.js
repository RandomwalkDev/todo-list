import express from "express"
import { createTodo, deleteTodo, editTodo, getTodos } from "../controllers/todoController.js";
const router = express.Router();

router.get('/getTodos', getTodos);
router.post('/create', createTodo);
router.patch('/edit/:id', editTodo);
router.delete('/delete/:id', deleteTodo);



export default router