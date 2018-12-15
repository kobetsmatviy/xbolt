$(function () {
    $("#formOnce").validate({
        rules: {
            first_name: {
                required: true,
                minlength: 2
            },
            telephone: {
                required: true,
                minlength: 10,
                maxlength: 13
            }
        },
        messages: {
            first_name: {
                required: "Запишіть як до вас мають звертатися",
                minlength: jQuery.validator.format("Щонайменше {0} символів")
            },
            telephone: {
                required: "Контактний номер для зв'язку",
                minlength: jQuery.validator.format("Щонайменше {0} символів"),
                maxlength: jQuery.validator.format("Перебільшено")
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


$(function () {
    $('input[name=first_name]').keyup(function(e) {
        e.preventDefault();
        var res = /[^а-яА-Яa-zA-ZїЇєЄіІёЁґ ]/g.exec(this.value);
        this.value = this.value.replace(res, '');
    });
    $('input[name=telephone]').keyup(function(e) {
        e.preventDefault();
        var res = /[^0-9+]/g.exec(this.value);
        this.value = this.value.replace(res, '');
    });
});
