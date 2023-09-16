var btn = document.getElementById("todobtn");
btn.addEventListener('click', function (event) {
    event.preventDefault();
});

var loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
function greetUserOnDashboard() {
    document.getElementById("showname").innerHTML = "Hello " + loggedUser.username.toUpperCase() + " !";
}
greetUserOnDashboard();

function showItemForm() {
    var addTodoItems = document.getElementById("todoInputs");
    addTodoItems.classList.remove("d-none");
}

var todoItemsArray = JSON.parse(localStorage.getItem("todoItemsArray")) || [];

var userId = loggedUser.userId;

var filterUserTodoItems = todoItemsArray.filter(function (item) {
    return item.userId == userId
});

function addTodoItem() {
    var addTodoForm = document.getElementById("todoInputs");
    var createdAt = new Date().toLocaleString();
    var title = document.getElementById("inputTitle4").value;
    var description = document.getElementById("inputDescription4").value;
    var priority = document.getElementById("inputPriority").value;
    var todoId = Date.now();



    var todoItem = {
        userId,
        todoId,
        title,
        description,
        priority,
        createdAt
    }

    if (!(title && description)) {
        Swal.fire({
            icon: 'error', title: 'Please Enter Input Fields'
        })
    } else {
        todoItemsArray.push(todoItem);
        localStorage.setItem("todoItemsArray", JSON.stringify(todoItemsArray))
        Swal.fire({
            icon: 'success', title: 'Item Added'
        })

        filterUserTodoItems = todoItemsArray.filter(function (item) {
            return item.userId == userId
        });

        clearInputs();
        clearHTMLtable();
        displayUserTodos();
        // showItemRow(filterUserTodoItems.length, title, description, priority, createdAt);
        addTodoForm.classList.add("d-none");
    }
}

// function showItemRow(filterUserTodoItemslength, title, description, priority, dateCreated, todoId) {
//     var table = document.getElementById("tableitems");
//     var tableRow = table.appendChild(document.createElement('tr'))
//     tableRow.innerHTML =
//         "<th>" + filterUserTodoItemslength + "</th>" +
//         "<td>" + title + "</td>" +
//         "<td>" + description + "</td>" +
//         "<td>" + priority + "</td>" +
//         "<td>" + dateCreated + "</td>" +
//         "<td>" + "<button class='btn btn-danger' onclick='deleteTodo()' >Delete</button>" + "</td>";
// }


function displayUserTodos() {
    var table = document.getElementById("tableitems");
    if (filterUserTodoItems) {
        for (var i = 0; i < filterUserTodoItems.length; i++) {
            var tableRow = table.appendChild(document.createElement('tr'))

            filterUserTodoItems = todoItemsArray.filter(function (item) {
                return item.userId == userId
            });

            tableRow.innerHTML =
                "<th>" + (i + 1) + "</th>" +
                "<td>" + filterUserTodoItems[i].title + "</td>" +
                "<td>" + filterUserTodoItems[i].description + "</td>" +
                "<td>" + filterUserTodoItems[i].priority + "</td>" +
                "<td>" + filterUserTodoItems[i].createdAt + "</td>" +
                "<td>" + "<button class='btn btn-danger' id='delete-todo' onclick='deleteTodo(" + filterUserTodoItems[i].todoId + ")' >Delete</button>" + "</td>"
        }
    }
}
if (filterUserTodoItems.length > 0) {
    displayUserTodos();
}

function clearInputs() {
    document.getElementById("inputTitle4").value = "";
    document.getElementById("inputDescription4").value = "";
}

function deleteAllUserItems() {
    if (filterUserTodoItems.length > 0) {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete all your todo list",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                ).then(function () {
                    if (filterUserTodoItems.length > 0) {
                        todoItemsArray = todoItemsArray.filter(function (item) {
                            return item.userId != userId
                        })
                        localStorage.setItem("todoItemsArray", JSON.stringify(todoItemsArray))
                        filterUserTodoItems = [];
                        clearHTMLtable();
                    }
                })
            }
        })

    } else {
        Swal.fire({
            title: 'No item to delete',
            icon: 'error'
        })
    }
}

function clearHTMLtable() {
    var table = document.getElementById("tableitems");
    table.innerHTML = "";
}

// document.addEventListener('click', function (event) {
//     if (event.target.classList.contains('delete-todo')) {
//         // Get the todoId from the data attribute
//         const todoId = event.target.getAttribute('data-todo-id');
//         // Call the deleteTodo function with the todoId
//         deleteTodo(todoId);
//     }
// });

function deleteTodo(todoId) {
    // Find the index of the todo item with the given todoId
    var indexToDelete = todoItemsArray.findIndex(item => item.todoId === todoId);
    if (indexToDelete !== -1) {
        // Remove the item from the array
        todoItemsArray.splice(indexToDelete, 1);

        // Update localStorage with the modified array
        localStorage.setItem("todoItemsArray", JSON.stringify(todoItemsArray));

        // Refresh the displayed todo items
        clearHTMLtable();
        displayUserTodos();
    }
}





// function addTodoItem() {
//     var title = document.getElementById("inputTitle4").value;
//     var description = document.getElementById("inputDescription4").value;
//     var priority = document.getElementById("inputPriority").value;
//     var addTodoItems = document.getElementById("todoInputs");
//     var dateCreated = new Date().toLocaleString();

//     if (!(title && description)) {
//         Swal.fire({
//             icon: 'warning',
//             title: 'Input field required',
//             text: 'Please Enter input field',
//         })
//     }
//     else {

//         todoItems.push(todoItems);

//         var filterUserTodoItems = todoItems.filter(function (item) {
//             return item.userId == userId
//         })
//         localStorage.setItem("todoList", JSON.stringify(todoItems));
//         Swal.fire({
//             icon: 'success',
//             title: 'Item added !',
//         })
//         createItemRow(filterUserTodoItems.length, title, description, priority, dateCreated);
//         clearInputs();
//         addTodoItems.classList.add("d-none");
//     }
//     console.log("filterUserTodoItems :", filterUserTodoItems);
// }



// var todoItems = JSON.parse(localStorage.getItem("todoList")) || [];
// // var uniqueTodoId = todoItems[todoItems.length - 1].todoID;
// var uniqueTodoId = todoItems.length + 10;
// var userId = loggedUser.userId;
// var filterUserTodoItems = todoItems.filter(function (item) {
//     return item.userId == userId;
// })

// var todoItems = {
//     userId,
//     todoID: ++uniqueTodoId,
//     title,
//     description,
//     priority,
//     dateCreated
// }





// function createItemRow(filterUserTodoItemslength, title, description, priority, dateCreated) {
//     var table = document.getElementById("tableitems");
//     var tableRow = table.appendChild(document.createElement("tr"));
//     // tableRow.appendChild(document.createElement("th")).textContent = filterUserTodoItemslength;
//     // tableRow.appendChild(document.createElement("td")).textContent = title;
//     // tableRow.appendChild(document.createElement("td")).textContent = description;
//     // tableRow.appendChild(document.createElement("td")).textContent = priority;
//     // tableRow.appendChild(document.createElement("td")).textContent = dateCreated;

//     tableRow.innerHTML =
//         "<th>" + filterUserTodoItemslength + "</th>" +
//         "<td>" + title + "</td>" +
//         "<td>" + description + "</td>" +
//         "<td>" + priority + "</td>" +
//         "<td>" + dateCreated + "</td>" +
//         "<td>" + "<button class='btn btn-danger' id='delete-todo' onclick='deleteTodo()' >Delete</button>" + "</td>"


// }

// function deleteAllItems() {
//     var filterUserTodoItems = todoItems.filter(function (item) {
//         return item.userId == userId;
//     })
//     if (filterUserTodoItems.length > 0) {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: "This will delete all the todo items!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 Swal.fire(
//                     'Deleted!',
//                     'Your file has been deleted.',
//                     'success'
//                 ).then(function () {
//                     todoItems = todoItems.filter(function (item) {
//                         return item.userId !== userId;
//                     });
//                     localStorage.setItem("todoList", JSON.stringify(todoItems));
//                     filterUserTodoItems = [];
//                     clearHTMLtable();
//                 })
//             }

//         })
//     } else {
//         Swal.fire({
//             icon: 'error',
//             title: 'No items to delete'
//         })
//     }
// }

// function clearHTMLtable() {
//     var table = document.getElementById("tableitems")
//     table.innerHTML = "";
// }


// if (filterUserTodoItems.length > 0) {
//     for (var i = 0; i < filterUserTodoItems.length; i++) {
//         var table = document.getElementById("tableitems");
//         var tableRow = table.appendChild(document.createElement("tr"));
//         // tableRow.appendChild(document.createElement("th")).textContent = i + 1;
//         // tableRow.appendChild(document.createElement("td")).textContent = filterUserTodoItems[i].title;
//         // tableRow.appendChild(document.createElement("td")).textContent = filterUserTodoItems[i].description;
//         // tableRow.appendChild(document.createElement("td")).textContent = filterUserTodoItems[i].priority;
//         // tableRow.appendChild(document.createElement("td")).textContent = filterUserTodoItems[i].dateCreated;

//         tableRow.innerHTML =
//             "<th>" + (i + 1) + "</th>" +
//             "<td>" + filterUserTodoItems[i].title + "</td>" +
//             "<td>" + filterUserTodoItems[i].description + "</td>" +
//             "<td>" + filterUserTodoItems[i].priority + "</td>" +
//             "<td>" + filterUserTodoItems[i].dateCreated + "</td>" +
//             "<td >" + "<button class='btn btn-danger' id='delete-todo' onclick='deleteTodo()' >Delete</button>" + "</td>"

//     }
// }





// function deleteTodo(todoID) {
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "This will delete the selected todo item!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             // Find the index of the todo item with the given todoID
//             const index = todoItems.findIndex(item => item.todoID === todoID);

//             if (index !== -1) {
//                 // Remove the todo item from the array
//                 todoItems.splice(index, 1);

//                 // Update local storage
//                 localStorage.setItem("todoList", JSON.stringify(todoItems));

//                 // Remove the corresponding table row from the HTML
//                 const table = document.getElementById("tableitems");
//                 const rowToRemove = document.querySelector(`tr[data-todoID="${todoID}"]`);

//                 if (rowToRemove) {
//                     table.removeChild(rowToRemove);
//                 }

//                 Swal.fire(
//                     'Deleted!',
//                     'The todo item has been deleted.',
//                     'success'
//                 );
//             }
//         }
//     });
// }