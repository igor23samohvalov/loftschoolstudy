/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */

function map(array, fn) {
    var newArray = [];

    for (let i = 0; i < array.length; i++) {
        newArray.push((fn(array[i], i, array)));
    }

    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */

function reduce(array, fn, initial) {
    if (initial === undefined) {
        initial = array[0];
        for (let i = 1; i < array.length; i++) {
            initial = fn(initial, array[i], i, array);
        }
    } else {
        for (let i = 0; i < array.length; i++) {
            initial = fn(initial, array[i], i, array);
        }
    }

    return initial;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */

function upperProps(obj) {
    let arrayOfKeys = [];

    Object.keys(obj).forEach(function(key) {
        arrayOfKeys.push(key.toString().toUpperCase());
    });

    return arrayOfKeys;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let newArray = [];

    if (Math.sign(from) === -1 && to === undefined) {
        from = array.length + from;
        to = array.length + 1;
    } else if (Math.sign(from) === -1 && Math.sign(to) === -1) {
        from = array.length + from;
        to = array.length + to;
    } else if (from === undefined && to === undefined) {
        from = 0;
        to = array.length + 1;
    } else if (to === undefined) {
        to = array.length + 1;
    } else if (Math.sign(from) === -1 && (Math.sign(to) === 1 || Math.sign(to) === 0)) {
        from = array.length + from;
    } else if ((Math.sign(from) === 1 || Math.sign(from) === 0) && Math.sign(to) === -1) {
        to = array.length + to;
    } else if (from === undefined && Math.sign(to) === 1) {
        from = 0;
    } else if (from === undefined && Math.sign(to) === -1) {
        from = 0;
        to = array.length + to;
    }
    array.forEach(function(elem, index, arr) {
        if (index >= from && index < to) {
            newArray.push(elem);
        }
    })

    return newArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
