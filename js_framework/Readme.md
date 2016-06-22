#  js-фреймворк работы с css классами dom элементов

* Выполнил: [Евгений Гришин](https://github.com/0948466).


---

Задание на вакансию стажёра-инженера JavaScript
(Яндекс.Недвижимость или Веб-приложения для сбора и
анализа экспертных данных


---

## Задание 2.  js-фреймворк работы с css классами dom элементов

Напишите свой небольшой js-фреймворк работы с css классами dom элементов. Итоговая функ-
циональность и интерфейсы отдаются на ваше усмотрение.


---

## Результат:

Скрипт js_framework.js:  

    /* Получение массива названий использованных классов */
    function getClassList(domElement) {
        return domElement.className.split(/\s+/);
    }

    function hasClass(domElement, className) {
        return getClassList(domElement).indexOf(className) != -1;
    }

    /* Добавить класс dom-элементу, если его ещё нет */
    function addClass(domElement, className) {
        if (getClassList(domElement).indexOf(className) == -1) {
            domElement.className += ' ' + className; 
        }
    }

    /* Добавить класс у dom-элементу */
    function removeClass(domElement, className) {
        var classList = getClassList(domElement);
        var index = classList.indexOf(className);
        if (index != -1) {
            classList[index] = classList[classList.length - 1];
            classList.pop();
            domElement.className = classList.join(' ');
        }
    }

    /* Добавить класс, если его нет. Если уже есть, то удалить. */
    function toggleClass(domElement, className) {
        if (hasClass(domElement, className))
            removeClass(domElement, className);
        else
            addClass(domElement, className);
    }

    var s1 = document.getElementById('s1');

    var s2 = document.getElementById('s2');
    addClass(s2, 'purple');

    var s3 = document.getElementById('s3');
    removeClass(s3, 'purple');

    var s4 = document.getElementById('s4');
    toggleClass(s4, 'purple');

    var s5 = document.getElementById('s5');
    toggleClass(s5, 'blue');