const month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const dt = new Date();

document.getElementById('day').textContent = dt.getDate();
document.getElementById('week').textContent = week[dt.getDay()];
document.getElementById('month_year').textContent = `${month[dt.getMonth()]} ${dt.getFullYear()}`;

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

const todoList = document.getElementById('todo-list');
const btnAddToDo = document.getElementById('btn_add_todo');


//Метод выводит все todo на экран 
getListToDo = async () => {
    try {
        const res = await fetch(TODOS_URL);
        const todos = await res.json();

        console.log(todos);

        for (let i = 0; i < todos.length; i++) {
            const todoBlock = document.createElement('div');
            todoBlock.classList.add('list__item');

            const todoLbl = document.createElement('label');
            todoLbl.textContent = todos[i].title;

            const deleteTodoBtn = document.createElement('button');
            deleteTodoBtn.textContent = "remove";

            const completedCheck = document.createElement('input');
            completedCheck.type = 'checkbox';
            completedCheck.addEventListener('click', () => {
                crossMadeToDo(completedCheck)
                updateToDo(todos[i].id, completedCheck);
            });

            todoBlock.append(completedCheck, todoLbl, deleteTodoBtn);
            todoList.prepend(todoBlock);

            if (todos[i].completed) {
                completedCheck.checked = 'true';
                crossMadeToDo(completedCheck);
            }

            deleteTodoBtn.addEventListener('click', () => {
                deleteToDo(todos[i].id, todoBlock)
            });
        }
    } catch (err) { console.log(err); }
}

//Метод удаляет todo
deleteToDo = async (id, node) => {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: "DELETE"
        })

        if (res.ok) {
            console.log('deleted');
        }
        else {
            console.log('not deleted');
        }
    } catch (err) { console.log(err); }
    node.remove();
}

//Метод добавляет todo
addToDo = async () => {
    try {
        const res = await fetch(TODOS_URL, {
            method: "POST",
            body: JSON.stringify  ({
                userID: 6,
                title: document.getElementById('txt').value,
                completed: false
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        if(res.ok) {
            console.log('added');
            getListToDo();
        }
        else {
            console.log('not added');
        }
    } catch (err) { console.log(err); }
}


//метод обновляет todo
updateToDo = async (id, node) => {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: "PATCH",
            body: JSON.stringify({completed: !node.checked})
        })
        if(res.ok) {
            console.log('updated');
        }
        else {
            console.log('not updated');
        }
    } catch (err) {console.log(err);}
}

//Метод зачеркивает сделанное todo
crossMadeToDo = (node) => {
    if (node.checked) {
        node.nextSibling.style.textDecoration = 'line-through'
    }
    else {
        node.nextSibling.style.textDecoration = 'none'
    }
}

getListToDo();

btnAddToDo.addEventListener('click', () => {
    addToDo();
})