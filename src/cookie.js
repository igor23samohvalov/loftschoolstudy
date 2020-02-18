/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    let trs = listTable.getElementsByTagName('tr');

    for (let tr of trs) {
        if (!isMatching(filterNameInput.value, tr.children[0].textContent, tr.children[1].textContent)) {
            tr.style.display = 'none';
        } else {
            tr.style.display = 'table-row';
        }
    }
    if (filterNameInput.value == '') {
        listTable.innerHTML = '';
        loadCookies();
    }
})

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    if (isMatching(filterNameInput.value, addValueInput.value, addValueInput.value) == false && filterNameInput.value != '') {
        removeCookieFromTable(addNameInput.value);
        addNameInput.value = '';
        addValueInput.value = '';
    } else if (isMatching(filterNameInput.value, addNameInput.value, addValueInput.value) == false && filterNameInput.value != '') {
        addNameInput.value = '';
        addValueInput.value = '';
    } else {
        addCookies(addNameInput.value, addValueInput.value);
        addNameInput.value = '';
        addValueInput.value = '';
    }
})

function loadCookies() {
    const cookies = document.cookie.split('; ').reduce(function(prev, current) {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev
    }, {})
        
    if (document.cookie != '') {
        for (key in cookies) {
            let tr = document.createElement('tr');
            
            tr.innerHTML = `<th>${key}</th>
                            <th>${cookies[key]}</th>
                            <th><a href="#">x</a></th>`;
            listTable.appendChild(tr);
        }
    }
}

loadCookies();

function addCookies(name, value) {
    let trs = listTable.getElementsByTagName('tr');

    for (let tr of trs) {
        if (tr.children[0].textContent == name) {

            return tr.children[1].textContent = `${value}`;
        }
    }
    let tr = document.createElement('tr');

    tr.innerHTML = `<th>${name}</th>
                    <th>${value}</th>
                    <th><a href="#">x</a></th>`;
    listTable.appendChild(tr);
}

function removeCookieFromTable(name) {
    let trs = listTable.getElementsByTagName('tr');

    for (let tr of trs) {
        if (tr.children[0].textContent == name) {
            tr.remove();
        }
    }
}

function isMatching(chunk, name, value) {
    if (name.toLowerCase().includes(chunk.toLowerCase()) || value.toLowerCase().includes(chunk.toLowerCase())) {
        return true
    }

    return false
}

listTable.addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target.tagName == 'A') {

        e.target.parentElement.parentElement.remove();
        document.cookie = `${e.target.parentElement.parentElement.children[0].textContent}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    }
})