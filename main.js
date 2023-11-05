
var apiTodoList = 'http://localhost:3000/todoList'


var start = () => {
    getTodoList(renderTodoList)
    handleCreateTodo()
}
start()

function getTodoList(callback) {
    fetch(apiTodoList)
    .then(
        (response) => {
            return response.json() 
        }
    )
    .then(callback)
}

function renderTodoList(data) {
    var renderBox = document.querySelector('.render ul')
    // Import img nothing to do
    if(data.length == 0) {
        var imgNothingTodo = document.getElementById('imgNothing')
        imgNothingTodo.style.display = 'block'
    } 
    
    var htmls = data.map(
        (todo) => {
            return `
                <li>
                    <p>${todo.id}. ${todo.note}</p>
                    <div>
                        <button onclick="handleDeleteTodo(${todo.id})">Delete<button>
                    </div>
                </li>
            `
        }
    )
    renderBox.innerHTML = htmls.join('')
}

function handleCreateTodo() {
    
    var btnTodo = document.querySelector('.typeInput button')

    btnTodo.onclick = () => {
        var inputTodo = document.querySelector('.typeInput input').value
        if(inputTodo.length >= 1) {
            var formData = {
                note: inputTodo
            }
            createTodo(formData , () => {
                getTodoList(renderTodoList) // To reload page
            })
        }
        
    }
    var keyInputTodo = document.querySelector('.typeInput input')
    keyInputTodo.onkeyup = (e) => {
        switch(e.key) {
            case 'Enter':
                var inputTodo = document.querySelector('.typeInput input').value
                var formData = {
                    note: inputTodo
                }
                createTodo(formData , () => {
                    getTodoList(renderTodoList) // To reload page
                })
                break
        }
    }

}

function createTodo(data , callback) {
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch(apiTodoList , options)
        .then(
            (response) => {
                return response.json()
            }
        )
        .then(callback)
}


function handleDeleteTodo(id) {
    var options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }
    fetch(apiTodoList + '/' + id , options)
        .then(
            (response) => {
                return response.json()
            }
        )
        .then(
            () => {
                getTodoList(renderTodoList)
            }
        )
}