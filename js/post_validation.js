$(function () {
    $("#formPost").validate({
        rules: {
            'photos[]': {
                required: true
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
            },
            region: {
                required: true
            },
            town: {
                required: true
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
                min: "Визначте стан деталі",
                max: "Визначте стан деталі"
            },
            region: {
                required: "Визначте своє місцерозташування"
            },
            town: {
                required: "Визначте своє місцерозташування"
            }
        },
        errorPlacement: function(error, element) {
            element.each(function() {
                var attrName = $(this).attr('name');
                var item = $(this).prop('name', attrName);

                $(this).closest('.interaction').next().find('.advice').remove();
                error.appendTo($(this).closest('.interaction').next());
            });
        }
    });
});