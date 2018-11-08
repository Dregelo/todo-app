import { setFilters } from "./filters"
import { createTodo } from "./todos"
import { renderTodos } from "./views"

renderTodos()

document.querySelector('#search-text').addEventListener('input', e => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector("#todoForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = e.target.elements.addTodo.value.trim();
    if(text.length > 0) {
        createTodo(text)
        renderTodos()
        e.target.elements.addTodo.value = "";
    }
})

document.querySelector("#hideCompletedTodo").addEventListener("change", (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos();
})
