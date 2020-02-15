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
    var i;
    
    if (initial === undefined) {
        i = 1;
        initial = array[0];
    } else {
        i = 0;
    }
    for (i; i < array.length; i++) {
        initial = fn(initial, array[i], i, array);
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

function slice(array, from = 0, to = array.length) {
    let newArray = [];

    if (to < 0) {
        to = array.length + to;
    }
    if (from < 0) {
        from = array.length + from;
    }
    for (let i = from; i < to; i++) {
        if (array[i]) {
            newArray.push(array[i])
        }
    }

    return newArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */

function createProxy(obj) {
    obj = new Proxy(obj, {
        set(target, prop, val) {
            if (typeof val == 'number') {
                target[prop] = Math.pow(val, 2);

                return true;
            } 
            
            return false;           
        }
    })
    
    return obj;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
