$(function () {
    $("#formLogin").validate({
        rules: {
            email: {
                required: true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            email: {
                required: "Введіть коректно e-mail"
            },
            password: {
                required: "Лишилося згадати пароль",
                minlength: jQuery.validator.format("Щонайменше {0} символів")
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
