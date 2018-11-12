$(function () {
    $("#formSell").validate({
        rules: {
            'photos[]': {
                required: true,
            },
            title: {
                required: true,
                minlength: 5
            },
            price: {
                required: true,
                min: 1,
                max: 9999999
            },
            stateRange: {
                required: true,
                min: 1,
                max: 10
            }
        },
        messages: {
            'photos[]': {
                required: "Оберіть фото запчастини"
            },
            title: {
                required: "Введіть назву деталі",
                minlength: jQuery.validator.format("Щонайменше {0} символів")
            },
            price: {
                required: "Укажіть ціну, що вважаєте за потрібну",
                min: "Ціна починається з 1грн",
                max: "Не більше 9 999 999грн"
            },
            stateRange: {
                required: "Визначте стан деталі",
                min: "Визначте стан деталі"
            }
        }
    });
});