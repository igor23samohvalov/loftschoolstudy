/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */

function delayPromise(seconds) {
    return new Promise(function(resolve) {
        setTimeout(() => resolve(), seconds*1000)
    })
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */

function loadAndSortTowns() {
    function sortByAlp(a, b) {
        let aName = a.name.toLowerCase(),
            bName = b.name.toLowerCase();

        if (aName < bName) {
            return -1
        } else if (aName > bName) {
            return 1
        } else if (aName == bName) {   
            return 0
        }
    }

    return fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
        .then(response => response.json())
        .then(json => json.sort(sortByAlp))
}

export {
    delayPromise,
    loadAndSortTowns
};
