$(function () {
    $("#formLogin").validate({
        rules: {
            email: {
                email: true
            },
            phone: {
                minlength: 10,
                maxlength: 13
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        errorPlacement: function(error, element) {
            return true;
        }
        // messages: {
        //     email: {
        //         required: "Введіть коректно e-mail"
        //     },
        //     password: {
        //         required: "Лишилося згадати пароль",
        //         minlength: jQuery.validator.format("Щонайменше {0} символів")
        //     }
        // },
        // errorPlacement: function(error, element) {
        //     element.each(function() {
        //         var attrName = $(this).attr('name');
        //         var item = $(this).prop('name', attrName);

        //         $(this).closest('.interaction').next().find('.advice').remove();
        //         error.appendTo($(this).closest('.interaction').next());
        //     });
        // }
    });
});

$(function () {
    $('input[name=email]').keyup(function(e) {        
        if( $(this).val() ) {
            $('input[name=phone]').prop({required: false, readonly: true}).addClass('disabled');
        }
        else {
            $('input[name=phone]').prop({required: true, readonly: false}).removeClass('disabled');
        }
    });
    $('input[name=phone]').keyup(function(e) {
        var res = /[^0-9+]/g.exec(this.value);
        this.value = this.value.replace(res, '');

        if( $(this).val() ) {
            $('input[name=email]').prop({required: false, readonly: true}).addClass('disabled');
        }
        else {
            $('input[name=email]').prop({required: true, readonly: false}).removeClass('disabled');
        }
    });
});