/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

// const button = document.createElement('button');

// homeworkContainer.appendChild(button);

// button.addEventListener('click', function(e) {

//     let randNum = function(num) {
//         return Math.round(Math.random() * num);
//     }

//     var div = document.createElement('div');

//     div.style = `height: ${randNum(100)}%; width: ${randNum(100)}%; background-color: rgb(${randNum(255)},${randNum(255)},${randNum(255)}); position: absolute; top: ${randNum(100)}%; left: ${randNum(100)}%`;
    
//     document.body.children[0].appendChild(div);

//     div.onmousedown = function(event) {
//         div.ondragstart = function() {

//             return false;
//         }

//     div.style.zIndex = 1000;

//     moveAt(event.pageX, event.pageY);
    
//     function moveAt(pageX, pageY) {
//         div.style.left = pageX - div.offsetWidth / 2 + 'px';
//         div.style.top = pageY - div.offsetHeight / 2 + 'px';
//     }

//     function onMouseMove(event) {
//          moveAt(event.pageX, event.pageY);
//     }

//     document.addEventListener('mousemove', onMouseMove);

//     div.onmouseup = function() {
//         document.removeEventListener('mousemove', onMouseMove);
//         div.onmouseup = null;
//     }
//   }
// })



/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {

  var div = document.createElement('div');

  let randNum = function(num) {
    return Math.round(Math.random() * num);
  }
  div.classList = 'draggable-div';
  div.style = `height: ${randNum(100)}%; width: ${randNum(100)}%; background-color: rgb(${randNum(255)},${randNum(255)},${randNum(255)}); position: absolute; top: ${randNum(100)}%; left: ${randNum(100)}%`;
  return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.onmousedown = function(event) {
        target.ondragstart = function() {

            return false;
        }
        target.style.zIndex = 1000;

        moveAt(event.pageX, event.pageY);
          
        function moveAt(pageX, pageY) {
            target.style.left = pageX - target.offsetWidth / 2 + 'px';
            target.style.top = pageY - target.offsetHeight / 2 + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        target.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            target.onmouseup = null;
        }
    }
  }

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
