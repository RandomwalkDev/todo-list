import axios from "axios"
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL


class TodoService {

    async addTodo(todo) {
        try {
            return await axios.post('/create', { todo }, {
                withCredentials: true
            });
        } catch (error) {
            return error
        }
    }

    async editTodo(id, todo) {
        try {
            return await axios.patch(`/edit/${id}`, todo, { withCredentials: true })
        } catch (error) {
            return error;
        }
    }

    async deleteTodo(id) {
        try {
            return await axios.delete(`/delete/${id}`, { withCredentials: true });
        } catch (error) {
            return error;
        }
    }

    async getTodos() {
        try {
            return await axios.get('/getTodos', {
                withCredentials: true
            })
        } catch (error) {
            return error
        }
    }

}

const todoService = new TodoService();

export default todoService;