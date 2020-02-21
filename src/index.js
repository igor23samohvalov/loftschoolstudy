/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */

function createDivWithText(text) {
    const div = document.createElement('div');   

    div.textContent = text;

    return div;
}

/*
 Задание 2:

 Функция должна вставлять элемент, переданный в параметре what в начало элемента, переданного в параметре where

 Пример:
   prepend(document.querySelector('#one'), document.querySelector('#two')) // добавит элемент переданный первым аргументом в начало элемента переданного вторым аргументом
 */

function prepend(what, where) {
    where.prepend(what);
}

/*
 Задание 3:

 3.1: Функция должна перебрать все дочерние элементы узла, переданного в параметре where

 3.2: Функция должна вернуть массив, состоящий из тех дочерних элементов, следующим соседом которых является элемент с тегом P

 Пример:
   Представим, что есть разметка:
   <body>
      <div></div>
      <p></p>
      <a></a>
      <span></span>
      <p></p>
   </dody>

   findAllPSiblings(document.body) // функция должна вернуть массив с элементами div и span т.к. следующим соседом этих элементов является элемент с тегом P
 */

function findAllPSiblings(where) {
    var newArray = [];
  
    for (let i = 0; i < where.children.length; i++) {
        if (where.children[i].nextElementSibling !== null && where.children[i].nextElementSibling.nodeName === 'P') {
            newArray.push(where.children[i]);
        }
    }
  
    return newArray;
}

/*
 Задание 4:

 Функция представленная ниже, перебирает все дочерние узлы типа "элемент" внутри узла переданного в параметре where и возвращает массив из текстового содержимого найденных элементов.
 Но похоже, что в код функции закралась ошибка и она работает не так, как описано.

 Необходимо найти и исправить ошибку в коде так, чтобы функция работала так, как описано выше.

 Пример:
   Представим, что есть разметка:
   <body>
      <div>привет</div>
      <div>loftschool</div>
   </dody>

   findError(document.body) // функция должна вернуть массив с элементами 'привет' и 'loftschool'
 */

function findError(where) {
    var result = [];

    for (var child of where.children) {
        result.push(child.textContent);
    }

    return result;
}

/*
 Задание 5:

 Функция должна перебрать все дочерние узлы элемента переданного в параметре where и удалить из него все текстовые узлы

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
   должно быть преобразовано в <div></div><p></p>
 */

function deleteTextNodes(where) {
    for (var i = where.childNodes.length - 1; i >=0; i--) {
        if (where.childNodes[i].nodeType === 3) {
            where.childNodes[i].remove();
        }
    }
}

/*
 Задание 6:

 Выполнить предудыщее задание с использование рекурсии - то есть необходимо заходить внутрь каждого дочернего элемента (углубляться в дерево)

 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */

function deleteTextNodesRecursive(where) {
    for (var i = where.childNodes.length - 1; i >=0; i--) {
        if (where.childNodes[i].nodeType === 3) {
            where.childNodes[i].remove();
        } else if (where.childNodes[i].childNodes !== undefined) {
            deleteTextNodesRecursive(where.childNodes[i]);
        } 
    }
}

/*
 Задание 7 *:

 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных

 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
 */

function collectDOMStat(root) {
    var result = {
        tags: {}, 
        texts: 0, 
        classes: {}
    }

    var tagArray = [];

    function getTagNamesArray(root) {
        for (let element of root.children) {
            tagArray.push(element.tagName);
            if (element.children !== undefined) {
                getTagNamesArray(element);
            }
        }
    }

    getTagNamesArray(root);

    var classNameArray = [];
    
    var classNamesString = '';
    
    function getClassNameArray(root) {

        for (let element of root.children) {
            if (element.className !== '') {
                classNamesString += element.className + ' ';
                if (element.children !== undefined) {
                    getClassNameArray(element);
                }
            } else {
                if (element.children !== undefined) {
                    getClassNameArray(element);
                }
            }
        }
    }

    getClassNameArray(root);

    classNameArray = classNamesString.split(' ');

    classNameArray.pop();

    function unique(arr) {
        let array = [];

        for (let str of arr) {
            if (!array.includes(str)) {
                array.push(str);
            }
        }

        return array;
    }

    let uniqueTagArray = unique(tagArray);

    let uniqueClassNameArray = unique(classNameArray);

    function getTags(arg) {
        for (var tag = 0; tag < arg.length; tag++) {
            result.tags[arg[tag]] = root.getElementsByTagName(arg[tag]).length;
        }
    }

    function getTexts(root) {
        for (let part of root.childNodes) {
            if (part.nodeType === 3) {
                result.texts += 1;
            } else {
                if (part.childNodes !== undefined) {
                    getTexts(part);
                }
            }
        }
    }

    function getClasses(arg) {
        for (var tag = 0; tag < arg.length; tag++) {
            result.classes[arg[tag]] = root.getElementsByClassName(arg[tag]).length;
        }
    }

    getTexts(root);

    getTags(uniqueTagArray);

    getClasses(uniqueClassNameArray);

    return result;
}

/*
 Задание 8 *:

 8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
 Как только в where добавляются или удаляются элементы,
 необходимо сообщать об этом при помощи вызова функции переданной в параметре fn

 8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
   - type: типа события (insert или remove)
   - nodes: массив из удаленных или добавленных элементов (в зависимости от события)

 8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов

 Рекомендуется использовать MutationObserver

 Пример:
   Если в where или в одного из его детей добавляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'insert',
     nodes: [div]
   }

   ------

   Если из where или из одного из его детей удаляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'remove',
     nodes: [div]
   }
 */

function observeChildNodes(where, fn) {
    var callback = function(mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.removedNodes.length != 0) {
                fn({
                    type: 'remove',
                    nodes: [...mutation.removedNodes]
                })
            } 
            if (mutation.addedNodes.length != 0) {
                fn({
                    type: 'insert',
                    nodes: [...mutation.addedNodes]
                })
            }
        }
    }
    let mo = new MutationObserver(callback),
    
        options = {
            'childList': true,
            'subtree': true
        }
    mo.observe(where, options);
}

export {
    createDivWithText,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};
