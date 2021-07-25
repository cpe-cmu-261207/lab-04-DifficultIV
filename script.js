/* Your code here */
let todo = { todoList: [], doneList: [] }

const loadFromStorage = () => {
    if (localStorage.todo) {
        todo = JSON.parse(localStorage.todo)
    }

    document.getElementById("todoList").innerHTML = ""
    document.getElementById("doneList").innerHTML = ""
    let lastTodoList
    let lastdoneList
    for (let id in todo.todoList) {
        lastTodoList = loadTodoList(todo.todoList[id], id)
    }
    for (let id in todo.doneList) {
        lastdoneList = loaddoneList(todo.doneList[id])
    }
    return { lastdoneList, lastTodoList }
}

const saveToStorage = () => {
    localStorage.todo = JSON.stringify(todo)
}


document.getElementById("inputdata")
    .addEventListener("keyup", function(e) {
    e.preventDefault();
    if (e.key === "Enter") {
        addlist()
    }
})

const addlist = () =>{
    const input = document.querySelector("input")
    if (input.value === "") {
        alert("Task cannot be empty")
    }
    else{

    todo.todoList.push(currentinput)
    loadTodoList(todo.todoList[todo.todoList.length - 1], todo.todoList.length - 1)
    saveToStorage()
    }
    input.value = ""
}
const loadTodoList = (input, id) => {
    const todoList = document.createElement("div")
    const titlelist = document.createElement("div")
    const button = document.createElement("div")
    const doneBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")
    doneBtn.innerHTML = "Done"
    deleteBtn.innerHTML = "Delete"
    todoList.classList.add("flex")
    todoList.classList.add("justify-between")
    todoList.classList.add("h-14")
    todoList.classList.add("px-4")
    todoList.classList.add("py-2")
    titlelist.classList.add("text-xl")
    button.classList.add("flex")
    button.classList.add("space-x-4")
    doneBtn.classList.add("invisible")
    doneBtn.classList.add("hover:bg-green-500")
    doneBtn.classList.add("bg-white")
    doneBtn.classList.add("rounded-md")
    doneBtn.classList.add("ring-offset-2")
    doneBtn.classList.add("ring-offset-green-200")
    doneBtn.classList.add("px-2")
    doneBtn.classList.add("transform")
    doneBtn.classList.add("duration-500")
    deleteBtn.classList.add("invisible")
    deleteBtn.classList.add("hover:bg-red-400")
    deleteBtn.classList.add("bg-white")
    deleteBtn.classList.add("rounded-md")
    deleteBtn.classList.add("ring-offset-2")
    deleteBtn.classList.add("ring-offset-red-200")
    deleteBtn.classList.add("px-2")
    deleteBtn.classList.add("transform")
    deleteBtn.classList.add("duration-500")
    doneBtn.addEventListener("click", () => {
        deleteBtn.disabled = true
        doneBtn.disabled = true
            todoList.remove()
            todo.todoList.splice(id, 1)
            todo.doneList.push(input)
            saveToStorage()
            const temp = loadFromStorage()

             temp.lastdoneList.classList.remove("opacity-0")

    })
    deleteBtn.addEventListener("click", () => {
        deleteBtn.disabled = true
        doneBtn.disabled = true
            todoList.remove()
            todo.todoList.splice(id, 1)
            saveToStorage()
            loadFromStorage()
    })
    todoList.addEventListener("mouseenter", () => {
        doneBtn.classList.replace("invisible", "visible")
        deleteBtn.classList.replace("invisible", "visible")
        doneBtn.classList.remove("opacity-0")
        deleteBtn.classList.remove("opacity-0")
    })
    todoList.addEventListener("mouseleave", () => {
        doneBtn.classList.replace("visible", "invisible")
        deleteBtn.classList.replace("visible", "invisible")
        doneBtn.classList.add("opacity-0")
        deleteBtn.classList.add("opacity-0")
    })
    titlelist.innerHTML = input
    button.append(doneBtn)
    button.append(deleteBtn)
    todoList.append(titlelist)
    todoList.append(button)
    document.getElementById("todoList").prepend(todoList)
    return todoList
}

const loaddoneList = (input) => {
    const doneLists = document.getElementById("doneList")
    const newmember = document.createElement("div")
    const title = document.createElement("div")
    newmember.classList.add("flex")
    newmember.classList.add("h-14")
    newmember.classList.add("px-4")
    newmember.classList.add("py-2")
    title.classList.add("text-xl")
    title.classList.add("self-center")
    title.innerHTML = input
    title.style.textDecoration = "line-through"
    newmember.append(title)
    doneLists.prepend(newmember)
    return newmember
}

const smoothclear = () => {
    localStorage.clear()
    location.reload()
}

const addinput = (ev) =>{
    currentinput = ev.target.value
}


loadFromStorage()
