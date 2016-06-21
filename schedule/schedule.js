    /*
        Функция принимает массив карточек с обязательными полями from, to и type.
        В зависимости от типа транспорта могут присутствовать дополнительные поля.
        Возвращает отсортированный в хронологическом порядке список карточек.
    */
    function sortSchedule(unsortedCards) {
        var cardByFrom = {}; // Словарь, в котором ключ - место отправления, а значение - посадочная карточка
        var cardByTo = {}; // Словарь, в котором ключ - место назначения, а значение - посадочная карточка
        for (var i = 0; i < unsortedCards.length; i++) { // Перебираем все карточки
            var card = unsortedCards[i];
            cardByFrom[card.from] = card;
            cardByTo[card.to] = card;
        }

        // Находим первую карточку на основании того, что ни одна другая карточка не ведёт в начальный город.
        var firstCard = null;
        for (var i = 0; i < unsortedCards.length; i++) {
            var card = unsortedCards[i];
            if (!cardByTo[card.from]) {
                firstCard = card;
                break;
            }
        }

        var currentCard = firstCard; // Начинаем заполнять результат с первой карточки.
        var result = [];
        while (result.length < unsortedCards.length) {
            result.push(currentCard); // Добавили карточку в результат
            currentCard = cardByFrom[currentCard.to]; // И перешли к карточке, на которую указывала только что добавленная
        }

        return result;
    }

    /*
        Функция принимает массив карточек и словарь описания типов транспорта.
        Ключ - тип транспорта, значение - функция, которая вернёт строковое представление карточки для этого транспорта.
        Возвращает текстовое описание маршрута. Каждая карточка располагается на отдельной строчке.
    */
    function getScheduleDescription(cards, transportTypes) {
        var result = '';
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            var descriptionFunction = transportTypes[card.type];
            result += descriptionFunction(card) + '\n'; // Вызываем функцию, описывающую карточку нужного нам типа транспорта 
        }
        return result;
    }

    var cards = [
        {
            from: 'Gerona Airport',
            to: 'Stockholm',
            type: 'flight',
            flight: 'SK455',
            gate: '45B',
            seat: '3A',
            baggage: 344
        },
        {
            from: 'Barcelona',
            to: 'Gerona Airport',
            type: 'airport_bus'
        },
        {
            from: 'Stockholm',
            to: 'New York JFK',
            type: 'flight',
            flight: 'SK22',
            gate: '22',
            seat: '7B',
            baggage: 'auto'
        },
        {
            from: 'Madrid',
            to: 'Barcelona',
            type: 'train',
            train_number: '78A',
            seat: '45B'
        }
    ];

    // Для добавления нового типа транспорта достаточно добавить запись в этот словарь и указать ключ в поле type карточки.
    // Функция может потребовать наличия у карточки дополнительных полей (например, flight, gate, seat и baggage у авиарейсов).
    var transportTypes = {
        train: function (card) {
            return 'Take train ' + card.train_number + ' from ' + card.from + ' to ' + card.to + '. Seat ' + card.seat + '.';
        },
        airport_bus: function (card) {
            return 'Take the airport bus from ' + card.from + ' to ' + card.to + '. No seat assignment.';
        },
        flight: function (card) {
            var baggageDescription;
            if (card.baggage == 'auto') baggageDescription = 'Baggage will be automatically transferred from your last leg.';
            else baggageDescription = 'Baggage drop at ticket counter ' + card.baggage + '.';

            return 'From ' + card.from + ', take flight ' + card.flight + ' to ' + card.to + '. Gate ' + card.gate
                + '. Seat ' + card.seat +'. ' + baggageDescription;
        }
    };

    alert(getScheduleDescription(sortSchedule(cards)));
