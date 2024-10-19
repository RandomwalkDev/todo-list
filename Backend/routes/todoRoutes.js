import express from "express"
const router = express.Router();
import { createTodo, deleteTodo, editTodo, getTodos } from "../controllers/todoController.js";

router.get('/getTodos', getTodos);
router.post('/create', createTodo);
router.patch('/edit/:id', editTodo);
router.delete('/delete/:id', deleteTodo);



export default router