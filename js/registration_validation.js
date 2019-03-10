$(function () {
    $("#formRegistration").validate({
        rules: {
            email: {
                email: true
            },
            telephone: {
                minlength: 10,
                maxlength: 13
            },
            password: {
                required: true,
                minlength: 6
            },
            first_name: {
                required: true,
                minlength: 2
            }
        },
        errorPlacement: function(error, element) {
            return true;
        }
    });
});


$(function () {
    $('input[name=email]').keyup(function(e) {        
        if( $(this).val() ) {
            $('input[name=telephone]').prop({required: false, readonly: true}).addClass('disabled');
        }
        else {
            $('input[name=telephone]').prop({required: true, readonly: false}).removeClass('disabled');
        }
    });
    $('input[name=telephone]').keyup(function(e) {
        var res = /[^0-9+]/g.exec(this.value);
        this.value = this.value.replace(res, '');

        if( $(this).val() ) {
            $('input[name=email]').prop({required: false, readonly: true}).addClass('disabled');
        }
        else {
            $('input[name=email]').prop({required: true, readonly: false}).removeClass('disabled');
        }
    });
    $('input[name=first_name]').keyup(function(e) {
        var res = /[^а-яА-Яa-zA-ZїЇєЄіІёЁґ ]/g.exec(this.value);
        this.value = this.value.replace(res, '');
    });
});
