import { getFilters } from "./filters"
import uuidv4 from "uuid/v4"

let todos = []

// Getting saved data
const loadTodos = () => {
    const todosJSON = localStorage.getItem("todos");
    try {
        todos = todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e) {
        todos = []
    }
}

// Save todos to local storage
const saveTodo = () => localStorage.setItem("todos", JSON.stringify(todos));

const fetchTodos = () => todos
// Filter todos and return approppriate array
const getFilteredArray = () => {
    const { searchText, hideCompleted } = getFilters()
    const filteredTodos = todos.filter((todo) => todo.text.toLowerCase().includes(searchText.toLowerCase()));
    const hiddenFilteredTodos = filteredTodos.filter(todo => !todo.completed);
    let array = !hideCompleted ? filteredTodos : hiddenFilteredTodos;
    return array;
}

const createTodo = (text) => {
        todos.push({ id: uuidv4(), text: text, completed: false });
        saveTodo()
}

// Remove todo function
const removeTodo = id => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    // this means a match was found, otherwise todoIndex would be -1
    if(todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodo()
    } 
}
loadTodos()

export { loadTodos, saveTodo, getFilteredArray, createTodo, removeTodo, fetchTodos }