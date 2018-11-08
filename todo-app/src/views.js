import { getFilteredArray, fetchTodos , saveTodo, removeTodo } from "./todos"
// Render Todos

const renderTodos = () => {
    const todosEl = document.querySelector("#todos");
    const filteredTodos = getFilteredArray()
    todosEl.innerHTML = "";
    generateSummary();
    if (filteredTodos.length > 0) {
        filteredTodos.map(todo => todosEl.appendChild(generateTodoDOM(todo)));
    } else {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("empty-message")
        emptyMessage.textContent = "No Todos to show!";
        todosEl.appendChild(emptyMessage)
    }
}

// get dom elements 
const generateTodoDOM = todo => {
    const todoEl = document.createElement("label");
    const containerEl = document.createElement("div");
    const checkBox = document.createElement("input");
    const todoText = document.createElement("span");
    const removeButton = document.createElement("button");

    // Setup checkbox
    checkBox.setAttribute("type", "checkbox");
    // check every box if todo is completed
    checkBox.checked = todo.completed;
    containerEl.appendChild(checkBox);
    checkBox.addEventListener("change", () => {
        todo.completed = !todo.completed;
        saveTodo();
        renderTodos()
    })

    // Setup todo text
    todoText.textContent = todo.text;
    containerEl.appendChild(todoText)

    //Setup container
    todoEl.classList.add("list-item")
    containerEl.classList.add("list-item__container")
    todoEl.appendChild(containerEl)

    // Setup remove button
    removeButton.textContent = "Remove";
    removeButton.classList.add("button", "button--text")
    todoEl.appendChild(removeButton);
    removeButton.addEventListener("click", () => {
        removeTodo(todo.id);
        renderTodos();
    })

    return todoEl;
}

// Generate summary
const generateSummary = () => {
    const incompleteTodos = fetchTodos().filter(todo => !todo.completed);
    const summary = document.createElement("h2")
    summary.classList.add("list-title")
    const plural = incompleteTodos.length > 1 ? "s" : ""
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left!`
    document.querySelector("#todos").appendChild(summary)
}

export { renderTodos }